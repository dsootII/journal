from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Entry, Container

class EntrySerializer(serializers.ModelSerializer):
  class Meta:
    model = Entry
    fields = '__all__'
    
class UserSerializer(serializers.ModelSerializer):
  entries = EntrySerializer(many=True)
  class Meta:
    model = User
    fields = ['id',  'username', 'first_name', 'last_name', 'entries']


class ContainerSerializer(serializers.ModelSerializer):
    entries = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Container
        fields = ['name', 'entries']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        entries = Entry.objects.filter(container=instance)
        representation['entries'] = EntrySerializer(entries, many=True).data
        return representation