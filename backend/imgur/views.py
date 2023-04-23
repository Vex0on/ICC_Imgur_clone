from rest_framework.decorators import api_view
from .custom_views.ImgurUser import (
    register_user,
    login,
    get_imgur_users,
    get_imgur_user,
    delete_imgur_user,
    update_imgur_user,
)
from .custom_views.Post import get_post, get_posts, create_post, update_post, delete_post
from .custom_views.Image import get_image, get_images, create_image, update_image, delete_image
from .custom_views.Subcomment import get_subcomment, get_subcomments
from .custom_views.Comment import CommentList, CommentDetail
from .custom_views.Reaction import ReactionList, ReactionDetail


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


# Post


@api_view(["GET"])
def get_post_view(request):
    return get_post(request)


@api_view(["GET"])
def get_posts_view(request):
    return get_posts(request)


@api_view(["POST"])
def create_post_view(request):
    return create_post(request)


@api_view(["PUT"])
def update_post_view(request):
    return update_post(request)


@api_view(["DELETE"])
def delete_post_view(request):
    return delete_post(request)


# Image


@api_view(["GET"])
def get_images_view(request):
    return get_images(request)


@api_view(["GET"])
def get_image_view(request):
    return get_image(request)


@api_view(["POST"])
def create_image_view(request):
    return create_image(request)


@api_view(["PUT"])
def update_image_view(request, id):
    return update_image(request, id)


@api_view(["DELETE"])
def delete_image_view(request, id):
    return delete_image(request, id)


# SUBCOMMENT


@api_view(["GET"])
def get_subcomment_view(request):
    return get_subcomment(request)


@api_view(["GET"])
def get_subcomments_view(request):
    return get_subcomments(request)


