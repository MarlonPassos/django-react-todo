from rest_framework import serializers
from .models import Todo 

class TodoSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = Todo 
        fields = '__all__'