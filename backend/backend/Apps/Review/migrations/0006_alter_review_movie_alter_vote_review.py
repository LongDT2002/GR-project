# Generated by Django 5.0.4 on 2024-07-07 13:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Movie", "0010_alter_movie_budget_alter_movie_revenue"),
        ("Review", "0005_remove_vote_timestamp"),
    ]

    operations = [
        migrations.AlterField(
            model_name="review",
            name="movie",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="review_movie",
                to="Movie.movie",
            ),
        ),
        migrations.AlterField(
            model_name="vote",
            name="review",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="vote_review",
                to="Review.review",
            ),
        ),
    ]