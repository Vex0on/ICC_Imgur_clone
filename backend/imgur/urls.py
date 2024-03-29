from django.urls import path

from . import views
from .custom_views import Comment, Reaction
from .custom_views.ImgurUser import delete_refresh_token, get_access_token

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
    path("subcomments/add", views.create_subcomment, name="add-subcomment"),
    path(
        "subcomments/update/<int:pk>",
        views.update_subcomment,
        name="update-subcomment",
    ),
    path(
        "subcomments/delete/<int:pk>",
        views.delete_subcomment,
        name="delete-subcomment",
    ),
    path("reactions", Reaction.ReactionList.as_view(), name="reactions"),
    path(
        "reactions/check/<int:record_id>/<int:individual_id>/<int:imgur_user_id>",
        Reaction.UserReaction.as_view(),
        name="reaction-user",
    ),
    path("reactions/count/0/<int:individual_id>", Reaction.CountReactionsPost.as_view(), name="reactions-post"),
    path("reactions/count/1/<int:individual_id>", Reaction.CountReactionsComment.as_view(), name="reactions-comment"),
    path("reactions/count/2/<int:individual_id>", Reaction.CountReactionsCommentSubcomment.as_view(), name="reactions-subcomment"),
    path("reactions/<int:record_id>/<int:individual_id>/<int:imgur_user_id>", Reaction.ReactionDetail.as_view(), name="delete-reaction"),
    path("reactions/check/<int:individual_id>/<int:imgur_user_id>", Reaction.UserReactions.as_view(), name="delete-reaction"),
    path("full-posts", views.get_full_posts, name="full-posts"),
    path("full-posts/<int:pk>", views.get_full_post, name="full-post"),
    path("token/refresh/delete", delete_refresh_token, name="refresh_delete"),
    path("token/access", get_access_token, name="access_get"),
]
