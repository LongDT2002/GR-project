# Generated by Django 5.0.4 on 2024-04-24 04:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Movie', '0004_rename_rate_movie_ave_rate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='ave_rate',
            field=models.FloatField(default=0.0),
        ),
    ]