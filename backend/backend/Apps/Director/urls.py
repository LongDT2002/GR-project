from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/', views.DirectorDetailView.as_view()),
    path('<int:pk>/movies/', views.DirectorMovieView.as_view()),
    path('<int:pk>/images/', views.DirectorImageView.as_view()),
    path('search/<str:query>', views.SearchDirectorView.as_view()),
]
