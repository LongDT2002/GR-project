from django.apps import AppConfig


class RateConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Apps.Rate'

    # def ready(self):
    #     from . import cache
    #     from .utils import recommend
    #     cache.recommendations = recommend()
