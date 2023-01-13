from django.urls import path
from videoapp import views


app_name = 'videoapp'

urlpatterns = [
    path('',views.index, name='index'),
]