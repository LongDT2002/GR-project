# Generated by Django 5.0.4 on 2024-06-17 17:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Director", "0006_remove_director_image"),
        ("Movie", "0007_alter_movie_director_alter_movie_genre_movie_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="movie",
            name="director",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="movie_director",
                to="Director.director",
            ),
        ),
        migrations.AlterField(
            model_name="movie_actor",
            name="movie",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="movie_actor",
                to="Movie.movie",
            ),
        ),
        migrations.AlterField(
            model_name="movievideo",
            name="movie",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="movievideo_set",
                to="Movie.movie",
            ),
        ),
    ]
