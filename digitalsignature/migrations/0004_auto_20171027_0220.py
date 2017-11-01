# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-27 02:20
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('digitalsignature', '0003_auto_20171027_0159'),
    ]

    operations = [
        migrations.CreateModel(
            name='Template',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('pdf', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='digitalsignature.PDF')),
            ],
        ),
        migrations.AddField(
            model_name='document',
            name='owner',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='document',
            name='pdf',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='digitalsignature.PDF'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='document',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
