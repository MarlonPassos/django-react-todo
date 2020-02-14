from django.urls import path 
from todo import views 

app_name = 'todos'

todo_list  = views.TodoView.as_view({
    'get': 'list',
    'post': 'create'
})

todo_detail = views.TodoView.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('', todo_list, name='todos'),
    path('<int:pk>/', todo_detail, name='todo-detail'),
]
