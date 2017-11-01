from rest_framework.serializers import ModelSerializer
from digitalsignature.models import PDF, Page, Document, Template, Party, AbstractParty, AbstractSignature, Signature


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
