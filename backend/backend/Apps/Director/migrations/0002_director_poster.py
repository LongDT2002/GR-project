# Generated by Django 5.0.4 on 2024-04-24 04:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Director', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='director',
            name='poster',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
    ]