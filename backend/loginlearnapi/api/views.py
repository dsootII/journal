from django.shortcuts import render
from rest_framework import generics, viewsets, response
from .serializers import *
from .models import *
from rest_framework.views import APIView
# Create your views here.

class ContainerListView(generics.ListAPIView):
  queryset = Container.objects.all()
  serializer_class = ContainerSerializer

# class ContainerListView(APIView):
#   def get(self, request):
#         containers = Container.objects.all()
#         try:
#           serializer = ContainerSerializer(containers, many=True)
#           print(serializer)
#           print(serializer.data)
#           if serializer.is_valid():
#             print(serializer.data)
#           return response.Response(serializer.data)
#         except Exception as e:
#           print("exception occured, ", e)
#           return response.Response(serializer.errors)
  
class ContainerCreateView(generics.CreateAPIView):
  queryset = Container.objects.all()
  serializer_class = ContainerSerializer
  
class EntryViewSet(viewsets.ModelViewSet):
  queryset = Entry.objects.all()
  serializer_class = EntrySerializer

