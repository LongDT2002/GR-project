# Generated by Django 5.0.4 on 2024-07-14 11:45

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Movie", "0016_alter_movie_actor_character_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="movie_actor",
            name="character_name",
            field=models.CharField(max_length=300),
        ),
    ]
