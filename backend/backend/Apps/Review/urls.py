from django.urls import path
from . import views

urlpatterns = [
    path('reviews/personal/', views.ReviewPersonalView.as_view(), name='review-personal'),
    path('<int:pk>/reviews/', views.ReviewListView.as_view(), name='review-list'),
    path('<int:pk>/reviews/new/', views.ReviewCreateView.as_view(), name='review-personal'),
    path('review/<int:pk>/vote/', views.ReviewVoteView.as_view(), name='review-update'),
]
