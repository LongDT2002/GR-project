# Generated by Django 5.0.4 on 2024-07-08 13:22

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Review", "0006_alter_review_movie_alter_vote_review"),
    ]

    operations = [
        migrations.AddField(
            model_name="review",
            name="num_vote_down",
            field=models.PositiveIntegerField(db_index=True, default=0),
        ),
        migrations.AddField(
            model_name="review",
            name="num_vote_up",
            field=models.PositiveIntegerField(db_index=True, default=0),
        ),
        migrations.AddField(
            model_name="review",
            name="vote_score",
            field=models.IntegerField(db_index=True, default=0),
        ),
    ]