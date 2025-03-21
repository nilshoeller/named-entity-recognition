from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),

    path("login/", views.loginUser, name="loginUser"),
    path("logout/", views.logoutUser, name="logoutUser"),
    path("register/", views.registerUser, name="registerUser"),
    path("session/", views.session_view, name="session_view"),
    
    path('add_data/', views.add_data, name='add_data'),
    path('get_user_data_all/', views.get_user_data_all, name='get_user_data_all'),
    path('get_user_data_public/', views.get_user_data_public, name='get_user_data_public'),
    path('get_user_data_private/', views.get_user_data_private, name='get_user_data_private'),
    path('get_user_data_by_id/<uuid:id>/', views.get_user_data_by_id, name='get_user_data_by_id'),
    path('get_public_data_all/', views.get_public_data_all, name='get_public_data_all'),
    path('delete_user_data/<uuid:pk>/', views.delete_data, name='delete_user_data'),
    path('update_data_by_id/<uuid:id>/', views.update_data_by_id, name='update_data_by_id'),
]