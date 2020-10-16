import requests, json

from django.shortcuts import render
from django.core.cache import cache

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser, ParseError

from igdb.wrapper import IGDBWrapper

from .models import *

# Create your views here.

class GetByIDView(APIView):

    permission_classes = [AllowAny, ]

    def get(self, request):

        wrapper = IGDBWrapper("2e0do9w27b1a3ds8ib2tx3979eke6w", "12znirzdkk072uxirvm5kwk6gc3o40")
        query = request.GET 
        game_id = query.get('id', '')

        if game_id in cache:
            data_cache = cache.get(game_id)

            return Response(data=data_cache)
        
        else:
            byte_array = wrapper.api_request(
                        'games',
                        'fields *; where id = ' + game_id  + ';'
            ).decode("utf-8")

            data = json.loads(byte_array)
            cover_id = str(data[0]['cover'])

            byte_array_cover = wrapper.api_request(
                        'covers',
                        'fields *; where id = ' + cover_id  + ';'
            ).decode("utf-8")

            byte_array_year = wrapper.api_request(
                        'release_dates',
                        'fields *; where game = ' + game_id + ';'
            ).decode("utf-8")

            data_year = json.loads(byte_array_year)

            year = str(data_year[0]['y'])

            cover_url = json.loads(byte_array_cover)
            cache.set(game_id, {'data': data, 'cover': cover_url, 'year': year}, 60)

            return Response(data = {
                'data': data,
                'cover': cover_url,
                'year': year
            })


class SearchByName(APIView):

    def get(self, request):

        wrapper = IGDBWrapper("2e0do9w27b1a3ds8ib2tx3979eke6w", "12znirzdkk072uxirvm5kwk6gc3o40")
        query = request.GET 
        search = query.get('search', '')

        if search in cache:
            data_cache = cache.get(search)

            return Response(data=data_cache)
        
        else:
            byte_array = wrapper.api_request(
                            'search',
                            'search "' +  search + '";' + 'fields *;' + 'where game.version_parent = null;' 
            ).decode("utf-8")

            data = json.loads(byte_array)

            return Response(data=data)



class FilterView(APIView):
    
    permission_classes = [AllowAny, ]

    def get(self, request):

        wrapper = IGDBWrapper("2e0do9w27b1a3ds8ib2tx3979eke6w", "12znirzdkk072uxirvm5kwk6gc3o40")
        
        query = request.GET 
        

        offset = query.get('offset', '')
        platforms = query.get('platforms', '')
        category = query.get('category', '')

        url_str = "?page[limit]="+"20"+"&page[offset]="+offset

        if category:
            url_str += "&filter%5Bcategory%5D="
            for cat in category.split(','):
                url_str += category + ""
        
        pass