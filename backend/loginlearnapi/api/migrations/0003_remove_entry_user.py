# Generated by Django 5.0.3 on 2024-06-10 14:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_container_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='entry',
            name='user',
        ),
    ]
