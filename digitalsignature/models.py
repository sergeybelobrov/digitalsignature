from django.contrib.auth.models import User
from django.db import models


class PDF(models.Model):
    name = models.CharField(max_length=255)
    datafile = models.FileField()
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User)
    pageWidth = models.FloatField(default=0)
    pageHeight = models.FloatField(default=0)


class Page(models.Model):
    datafile = models.FileField()
    number = models.IntegerField()
    parent_pdf = models.ForeignKey(PDF, on_delete=models.CASCADE)


class Document(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    pdf = models.ForeignKey(PDF)
    owner = models.ForeignKey(User)


class Template(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    pdf = models.ForeignKey(PDF)
    owner = models.ForeignKey(User)


class Party(models.Model):
    email = models.EmailField()
    document = models.ForeignKey(Document)
    user = models.ForeignKey(User, null=True)


class AbstractParty(models.Model):
    number = models.IntegerField()
    template = models.ForeignKey(Template)


class AbstractSignature(models.Model):
    top = models.FloatField(default=0)
    left = models.FloatField(default=0)
    page = models.ForeignKey(Page)
    party = models.ForeignKey(AbstractParty)
    template = models.ForeignKey(Template)


class Signature(models.Model):
    top = models.FloatField(default=0)
    left = models.FloatField(default=0)
    page = models.ForeignKey(Page)
    party = models.ForeignKey(Party)
    document = models.ForeignKey(Document)
    sign = models.FileField(null=True)
