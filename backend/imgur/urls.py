from django.urls import path
from . import views

urlpatterns = [
    path('register', views.register_user, name='register_user'),
    path('login', views.login, name='login_user'),
    
    path('users', views.getImgurUsers, name='imgurUsers'),
    path('users/<int:pk>', views.getImgurUser, name='imgurUser'),
    path('posts', views.getPosts, name='posts'),
    path('posts/<int:pk>', views.getPost, name='post'),
    path('images', views.getImages, name='images'),
    path('images/<int:pk>', views.getImage, name='image'),
    path('likes', views.getLikes, name='likes'),
    path('likes/<int:pk>', views.getLike, name='like'),
    path('comments', views.getComments, name='comments'),
    path('comments/<int:pk>', views.getComment, name='comment'),
    path('subcomments', views.getSubcomments, name='subcomments'),
    path('subcomments/<int:pk>', views.getSubcomment, name='subcomment'),
    path('reactions', views.getReactions, name='reactions'),
    path('reactions/<int:pk>', views.getReaction, name='reaction'),
]
