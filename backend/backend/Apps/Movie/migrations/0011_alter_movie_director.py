# Generated by Django 5.0.4 on 2024-07-07 13:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Director", "0007_alter_directorimage_director"),
        ("Movie", "0010_alter_movie_budget_alter_movie_revenue"),
    ]

    operations = [
        migrations.AlterField(
            model_name="movie",
            name="director",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="movie_director",
                to="Director.director",
            ),
        ),
    ]
