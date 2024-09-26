from django.db import models

class Prediction(models.Model):
    predict_val = models.JSONField(default=list)
    forecast_data = models.JSONField(default=list)