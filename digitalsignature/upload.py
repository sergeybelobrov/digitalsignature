import os
import re
import shutil
import subprocess
import tempfile
from PIL import Image
from django import forms
from django.core.exceptions import ValidationError
from django.core.files import File
from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from .models import PDF, Page, Document, Template
import logging
logger = logging.getLogger("pdf_upload")


def validate_datafile(value):
    filename, file_extension = os.path.splitext(value.name)
    if file_extension != '.pdf':
        raise ValidationError(u'Only pdf files are supported')


class UploadPDFForm(forms.Form):
    CHOICES = (
        ('Document', 'Document'),
        ('Template', 'Template'),
    )
    datafile = forms.FileField(validators=[validate_datafile], required=True)
    upload_for = forms.ChoiceField(required=True, choices=CHOICES)


class BadPDFFile(Exception):
    pass


def pre_process_pdf(request, f):
    filename, file_extension = os.path.splitext(f.name)

    dir_path = tempfile.mkdtemp()
    pdf_file_path = os.path.join(dir_path, f.name)

    # write file to temp dir
    with open(pdf_file_path, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

    # create images
    subprocess.call(["pdftoppm", pdf_file_path, os.path.join(dir_path, "page"),
                     "-jpeg", "-scale-to-x", "1056", "-scale-to-y", "1344"])

    # upload to django model
    pdf = PDF()
    pdf.owner = request.user
    pdf.name = filename
    pdf.datafile.save(f.name, File(open(pdf_file_path, "rb")))
    pdf.save()

    # upload pages
    # if not page found return error
    tmp_files = os.listdir(dir_path)
    if len(tmp_files) <= 1:
        raise BadPDFFile
    any_page = ""
    for page_file in tmp_files:
        if page_file == f.name:
            continue
        page = Page()
        page.parent_pdf = pdf
        page_number = re.findall("page-([0-9]+).jpg", page_file)
        page.number = int(page_number[0]) - 1
        page.datafile.save(page_file, File(open(os.path.join(dir_path, page_file), "rb")))
        page.save()
        any_page = page_file

    # get dimension of each page
    im = Image.open(open(os.path.join(dir_path, any_page), "rb"))
    pdf.page_width = im.size[0]
    pdf.page_height = im.size[1]
    pdf.save()

    # delete temp folder
    shutil.rmtree(dir_path)

    return pdf


class UploadPDFView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    form_class = UploadPDFForm

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST, request.FILES)
        if form.is_valid():
            try:
                pdf = pre_process_pdf(request, request.FILES['datafile'])
            except Exception as e:
                logger.exception("error processing pdf")
                # invalid
                return JsonResponse({
                    'detail': "Internal error",
                }, status=505)

            if request.POST["upload_for"] == "Document":
                doc = Document()
                doc.pdf = pdf
                doc.owner = request.user
                doc.name = pdf.name
                doc.save()
                return JsonResponse({
                    'document_id': doc.pk,
                })
            else:
                temp = Template()
                temp.pdf = pdf
                temp.owner = request.user
                temp.name = pdf.name
                temp.save()
                return JsonResponse({
                    'template_id': temp.pk,
                })

        # invalid
        return JsonResponse({
            'detail': dict(form.errors.items()),
        }, status=400)
