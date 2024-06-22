from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import Director, DirectorImage

# Register your models here.

@admin.register(Director)
class DirectorAdmin(ModelAdmin):
    list_filter_submit = True
    search_fields = ["name"]

@admin.register(DirectorImage)
class DirectorImageAdmin(admin.ModelAdmin):
    search_fields = ["director__name"]
