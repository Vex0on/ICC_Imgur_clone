from django.urls import path
from . import views
from .custom_views import Comment, Reaction

urlpatterns = [
    path("register", views.register_user, name="register_user"),
    path("login", views.login, name="login_user"),
    path("delete/<int:pk>", views.delete_imgur_user, name="delete-user"),
    path("update/<int:pk>", views.update_imgur_user, name="update-user"),
    path("users", views.get_imgur_users, name="imgurUsers"),
    path("users/<int:pk>", views.get_imgur_user, name="imgurUser"),
    path("posts", views.get_posts, name="posts"),
    path("posts/<int:pk>", views.get_post, name="post"),
    path("posts/add", views.create_post, name="add-post"),
    path("posts/update/<int:pk>", views.update_post, name="update-post"),
    path("posts/delete/<int:pk>", views.delete_post, name="delete-post"),
    path("images", views.get_images, name="images"),
    path("images/<int:pk>", views.get_image, name="image"),
    path("images/add", views.create_image, name="add-image"),
    path("images/update/<int:pk>", views.update_image, name="update-image"),
    path("images/delete/<int:pk>", views.delete_image, name="delete-image"),
    path("comments", Comment.CommentList.as_view(), name="comments"),
    path("comments/<int:pk>", Comment.CommentDetail.as_view(), name="comment"),
    path("subcomments", views.get_subcomments, name="subcomments"),
    path("subcomments/<int:pk>", views.get_subcomment, name="subcomment"),
    path("reactions", Reaction.ReactionList.as_view(), name="reactions"),
    path("reactions/<int:pk>", Reaction.ReactionDetail.as_view(), name="reaction"),

]
