# Generated by Django 5.0.4 on 2024-07-08 13:51

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("Review", "0007_review_num_vote_down_review_num_vote_up_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="review",
            name="num_vote_down",
        ),
        migrations.RemoveField(
            model_name="review",
            name="num_vote_up",
        ),
        migrations.RemoveField(
            model_name="review",
            name="vote_score",
        ),
    ]
