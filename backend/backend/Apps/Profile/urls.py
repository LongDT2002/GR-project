from django.urls import path
from . import views

urlpatterns = [
    path("<int:pk>/view/", views.ProfileView.as_view(), name="profile"),
    path("personal/view/", views.ProfilePersonalView.as_view(), name="profile"),
    path("update/", views.ProfileUpdateView.as_view(), name="update_profile"),
]
