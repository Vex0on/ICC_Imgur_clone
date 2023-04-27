from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Image, Post
from ..serializers import FullPostSerializer


@api_view(["GET"])
def get_full_posts(request):
    post = Post.objects.all()
    serializer = FullPostSerializer(post, many=True)
    return Response(serializer.data)
