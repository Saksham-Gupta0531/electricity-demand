from rest_framework import generics
from rest_framework.response import Response
from .models import Prediction
from .serializer import PredictionSerializer
import dill
import os
import json

FORECAST_FILE_PATH = os.path.join(os.path.dirname(__file__), 'forecast.dill')

def load_forecast():
    """Load the forecast model from a file."""
    if os.path.exists(FORECAST_FILE_PATH):
        with open(FORECAST_FILE_PATH, 'rb') as f:
            return dill.load(f)
    return None

def getdata():
    forecast = load_forecast()
    if forecast is not None:
        return forecast.tolist()
    return []

class PredictionListCreateView(generics.ListCreateAPIView):
    queryset = Prediction.objects.all()
    serializer_class = PredictionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Get forecast data
        forecast_data = getdata()
        
        # Save both predict_val and forecast_data
        instance = serializer.save(forecast_data=forecast_data)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=201, headers=headers)