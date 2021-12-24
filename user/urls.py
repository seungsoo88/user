from django.urls import path

from . import views

urlpatterns = [
    path('', views.CreateUser.as_view()),
    path('list/', views.UserListUser.as_view()),
    path('<int:pk>/', views.DetailUser.as_view()),
    
]


