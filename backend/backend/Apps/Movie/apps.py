from django.apps import AppConfig


class MovieConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Apps.Movie'

    # def ready(self):
    #     from .recommendation import train_recommender
    #     train_recommender()


