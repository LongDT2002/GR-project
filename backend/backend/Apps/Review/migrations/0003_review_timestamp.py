# Generated by Django 5.0.4 on 2024-06-17 17:54

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Review", "0002_rename_review_review_content_review_num_vote_down_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="review",
            name="timestamp",
            field=models.DateField(default=datetime.date.today),
        ),
    ]
