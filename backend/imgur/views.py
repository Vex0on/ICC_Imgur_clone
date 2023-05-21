from rest_framework.decorators import api_view
from .custom_views.FullPost import get_full_post, get_full_posts
from .custom_views.Image import (
    create_image,
    delete_image,
    get_image,
    get_images,
    update_image,
)
from .custom_views.ImgurUser import (
    delete_imgur_user,
    get_imgur_user,
    get_imgur_users,
    login,
    register_user,
    update_imgur_user,
)
from .custom_views.Post import (
    create_post,
    delete_post,
    get_post,
    get_posts,
    update_post,
    search_by_tag
)
from .custom_views.Subcomment import (
    create_subcomment,
    delete_subcomment,
    get_subcomment,
    get_subcomments,
    update_subcomment,
)

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
def get_full_posts_view(request):
    return get_full_posts(request)


@api_view(["GET"])
def get_full_post_view(request):
    return get_full_post(request)


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


@api_view(["GET"])
def search_by_tag_post(request):
    return search_by_tag(request)


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


@api_view(["POST"])
def create_subcomment_view(request):
    return create_subcomment(request)


@api_view(["PUT"])
def update_subcomment_view(request):
    return update_subcomment(request)


@api_view(["GET"])
def delete_subcomment_view(request):
    return delete_subcomment(request)
