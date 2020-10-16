from django.db import models
from games.models import Game

# Create your models here.

class Review(models.Model):
    name = models.CharField(max_length=30)
    game = models.IntegerField()
    # game_id = models.ForeignKey(Game, on_delete=models.CASCADE)
    detail = models.CharField(max_length=500)
    stars = models.FloatField(default=2.5)