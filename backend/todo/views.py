from rest_framework import viewsets
from .serializers import TodoSeriallizer
from .models import Todo 

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSeriallizer
    queryset = Todo.objects.all()
