from rest_framework.decorators import api_view
from .custom_views.ImgurUser import (
    register_user,
    login,
    get_imgur_users,
    get_imgur_user,
    delete_imgur_user,
    update_imgur_user,
)
from .custom_views.Post import get_post, get_posts
from .custom_views.Image import get_image, get_images
from .custom_views.Comment import get_comment, get_comments
from .custom_views.Subcomment import get_subcomment, get_subcomments
from .custom_views.Reaction import get_reaction, get_reactions


# IMGUR USER


@api_view(["POST"])
def register_user_view(request):
    return register_user(request)


@api_view(["POST"])
def login_user_view(request):
    return login(request)


@api_view(["GET"])
def get_users_view(request):
    return get_imgur_users(request)


@api_view(["GET"])
def get_user_view(request):
    return get_imgur_user(request)


@api_view(["DELETE"])
def delete_user_view(request):
    return delete_imgur_user(request)


@api_view(["PUT"])
def update_user_view(request):
    return update_imgur_user(request)


# POST


@api_view(["GET"])
def get_post_view(request):
    return get_post(request)


@api_view(["GET"])
def get_posts_view(request):
    return get_posts(request)


# Image


@api_view(["GET"])
def get_images_view(request):
    return get_images(request)


@api_view(["GET"])
def get_image_view(request):
    return get_image(request)


# COMMENT


@api_view(["GET"])
def get_comment_view(request):
    return get_comment(request)


@api_view(["GET"])
def get_comments_view(request):
    return get_comments(request)


# SUBCOMMENT


@api_view(["GET"])
def get_subcomment_view(request):
    return get_subcomment(request)


@api_view(["GET"])
def get_subcomments_view(request):
    return get_subcomments(request)


# REACTION


@api_view(["GET"])
def get_reaction_view(request):
    return get_reaction(request)


@api_view(["GET"])
def get_reactions_view(request):
    return get_reactions(request)
