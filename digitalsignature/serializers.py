from rest_framework.serializers import ModelSerializer
from digitalsignature.models import PDF, Page, Document, Template, Party, AbstractParty, AbstractSignature, Signature
from django.core.mail import send_mail

class PDFSerializer(ModelSerializer):

    class Meta:
        model = PDF
        fields = '__all__'


class PageSerializer(ModelSerializer):

    class Meta:
        model = Page
        fields = '__all__'


class DocumentSerializer(ModelSerializer):

    class Meta:
        model = Document
        fields = '__all__'


class TemplateSerializer(ModelSerializer):

    class Meta:
        model = Template
        fields = '__all__'


class PartySerializer(ModelSerializer):

    class Meta:
        model = Party
        fields = '__all__'


class AbstractPartySerializer(ModelSerializer):

    class Meta:
        model = AbstractParty
        fields = '__all__'


class AbstractSignatureSerializer(ModelSerializer):

    class Meta:
        model = AbstractSignature
        fields = '__all__'


class SignatureSerializer(ModelSerializer):

    class Meta:
        model = Signature
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        context = kwargs.get('context', None)
        print(kwargs)
        if context:
            request = kwargs['context']['request']
            if request.method == 'POST':
                query = kwargs['data']
                # GETTING EMAIL ADDRESS
                party_id  = query['party']
                party_obj = Party.objects.get(pk = party_id)
                email_adr = party_obj.email
                print(email_adr)
                send_mail(
                    'Test Subject',
                    'Here is the message.',
                    'noreply@parsifal.co',
                    [email_adr],
                    fail_silently=False
                )
                print("POST")
            elif request.method == 'GET':
                print("GET")