from rest_framework.viewsets import ModelViewSet
from digitalsignature.serializers import PDFSerializer, PageSerializer, DocumentSerializer, TemplateSerializer, PartySerializer, AbstractPartySerializer, AbstractSignatureSerializer, SignatureSerializer
from digitalsignature.models import PDF, Page, Document, Template, Party, AbstractParty, AbstractSignature, Signature


class PDFViewSet(ModelViewSet):
    queryset = PDF.objects.all()
    serializer_class = PDFSerializer


class PageViewSet(ModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    filter_fields = ("parent_pdf",)


class DocumentViewSet(ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer


class TemplateViewSet(ModelViewSet):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer


class PartyViewSet(ModelViewSet):
    queryset = Party.objects.all()
    serializer_class = PartySerializer


class AbstractPartyViewSet(ModelViewSet):
    queryset = AbstractParty.objects.all()
    serializer_class = AbstractPartySerializer


class AbstractSignatureViewSet(ModelViewSet):
    queryset = AbstractSignature.objects.all()
    serializer_class = AbstractSignatureSerializer


class SignatureViewSet(ModelViewSet):
    queryset = Signature.objects.all()
    serializer_class = SignatureSerializer
