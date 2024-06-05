from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

app_name = 'api'

router = DefaultRouter()
router.register(r'entries', EntryViewSet, basename='entry')

urlpatterns = [
  path('listcontainers', ContainerListView.as_view(), name='container-list'),
  path('createcontainer', ContainerCreateView.as_view(), name='create-container'),
  path('', include(router.urls))
]