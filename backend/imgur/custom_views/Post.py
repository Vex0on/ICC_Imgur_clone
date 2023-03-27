from rest_framework import status
from rest_framework.decorators import api_view
from ..models import Post
from ..serializers import PostSerializer
from rest_framework.response import Response


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