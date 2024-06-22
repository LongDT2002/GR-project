from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/', views.ActorDetailView.as_view()),
    path('<int:pk>/movies/', views.ActorMovieView.as_view()),
    path('<int:pk>/images/', views.ActorImageView.as_view()),
    path('search/<str:query>', views.SearchActorView.as_view()),
]
