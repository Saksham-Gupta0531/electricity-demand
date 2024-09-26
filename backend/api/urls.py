from django.urls import path
from .views import PredictionListCreateView

urlpatterns = [
    path('details/', PredictionListCreateView.as_view())
]