# Generated by Django 5.1.4 on 2024-12-06 08:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('empapp', '0003_form_field'),
    ]

    operations = [
        migrations.CreateModel(
            name='DynamicField',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=255)),
                ('field_type', models.CharField(choices=[('text', 'Text'), ('number', 'Number'), ('date', 'Date'), ('password', 'Password')], max_length=50)),
                ('value', models.CharField(max_length=255)),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='dynamic_fields', to='empapp.employeemodel')),
            ],
        ),
    ]
