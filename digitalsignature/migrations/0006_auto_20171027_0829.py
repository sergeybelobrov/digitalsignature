# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-27 08:29
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('digitalsignature', '0005_abstractparty_abstractsignature_party_signature'),
    ]

    operations = [
        migrations.RenameField(
            model_name='page',
            old_name='parent_document',
            new_name='parent_pdf',
        ),
    ]
