from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Image, Post
from ..serializers import FullPostSerializer


@api_view(["GET"])
def get_full_posts(request):
    posts = Post.objects.all()
    serializer = FullPostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_full_post(request, pk):
    try:
        post = Post.objects.get(id=pk)
        serializer = FullPostSerializer(post, many=False)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )
    except Post.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"},
            status=status.HTTP_404_NOT_FOUND,
        )
