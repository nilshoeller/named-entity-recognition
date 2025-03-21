from rest_framework import serializers
from .models import UserData
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']  # Add more fields as needed

class GetDataSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = UserData
        fields = ['id', 'created_at', 'updated_at', 'text', 'analyzed_text', 'is_public', 'user']

class SaveDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ['text', 'is_public']