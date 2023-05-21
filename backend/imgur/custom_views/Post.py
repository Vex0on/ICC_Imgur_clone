import json
import os

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Image, Post
from ..serializers import ImageSerializer, PostSerializer


@api_view(["GET"])
def get_post(request, pk):
    post = Post.objects.get(id=pk)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)


@api_view(["GET"])
def get_posts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def create_post(request):
    image = request.data.get("image")
    post_data = json.loads(request.POST.get("post"))
    post_serializer = PostSerializer(data=post_data)
    if post_serializer.is_valid():
        new_post = post_serializer.save()

    image_serializer = ImageSerializer(data={"image": image, "post": new_post.id})
    if image_serializer.is_valid():
        image_serializer.save()

        return Response(
            image_serializer.data,
            status=status.HTTP_201_CREATED,
        )
    return Response(
        image_serializer.errors,
        status=status.HTTP_422_UNPROCESSABLE_ENTITY,
    )


@api_view(["PUT"])
def update_post(request, pk):
    try:
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(instance=post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(
                {"message": "HTTP_400_BAD_REQUEST"},
                status=status.HTTP_400_BAD_REQUEST,
            )
    except Post.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["DELETE"])
def delete_post(request, pk):
    try:
        post = Post.objects.get(id=pk)
        images = Image.objects.filter(post=pk)
        for image in images:
            os.remove(image.path)
        post.delete()
        return Response(
            {"message": "HTTP_204_NO_CONTENT"},
            status=status.HTTP_204_NO_CONTENT,
        )
    except Post.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"},
            status=status.HTTP_404_NOT_FOUND,
        )


def search_by_tag(request):
    try:
        tag = request.data.get("tag")
        posts = Post.objects.filter(tag__icontains=tag.lower())
        serializer = PostSerializer(posts, many=True)
        return Response(
            {"data": serializer.data}, status=status.HTTP_200_OK
        )
    except Post.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"},
            status=status.HTTP_404_NOT_FOUND,
        )
