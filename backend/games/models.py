from django.db import models

# Create your models here.

class Game(models.Model):
    game = models.CharField(max_length=5)
    name = models.CharField(max_length=100)