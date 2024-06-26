# Generated by Django 5.0.4 on 2024-06-18 18:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Movie", "0008_alter_movie_director_alter_movie_actor_movie_and_more"),
        ("Watchlist", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="watchlist",
            old_name="user",
            new_name="account",
        ),
        migrations.CreateModel(
            name="Watchlist_Movie",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "movie",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="Movie.movie"
                    ),
                ),
                (
                    "watchlist",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="Watchlist.watchlist",
                    ),
                ),
            ],
        ),
    ]
