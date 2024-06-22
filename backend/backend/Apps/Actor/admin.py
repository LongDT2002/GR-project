from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import Actor, ActorImage

# Register your models here.

@admin.register(Actor)
class ActorAdmin(ModelAdmin):
    list_filter_submit = True
    search_fields = ["name"]

@admin.register(ActorImage)
class ActorImageAdmin(admin.ModelAdmin):
    search_fields = ["actor__name"]
    fields = ['image_tag', "image", "actor"]
    readonly_fields = ('image_tag',)
