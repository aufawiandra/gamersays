from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializer import *

# Create your views here.

class ReviewView(APIView):

    serializer_class = ReviewSerializer

    def get(self, request):
        detail = [ {
            "name": detail.name,
            "game": detail.game,
            "detail": detail.detail,
            "stars": detail.stars
        }
        for detail in Review.objects.all()]
        return Response(detail)

    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)