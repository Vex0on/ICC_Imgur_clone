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


@api_view(["POST"])
def create_post(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        post = serializer.save()
        return Response(post, status=status.HTTP_201_CREATED)
    return Response({"message": "HTTP_422_UNPROCESSABLE_ENTITY"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


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
                {"message": "HTTP_400_BAD_REQUEST"}, status=status.HTTP_400_BAD_REQUEST
            )
    except Post.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["DELETE"])
def delete_post(request, pk):
    try:
        post = Post.objects.get(id=pk)
        post.delete()
        return Response(
            {"message": "HTTP_204_NO_CONTENT"}, status=status.HTTP_204_NO_CONTENT
        )
    except Post.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"}, status=status.HTTP_404_NOT_FOUND
        )
