from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Comment
from ..serializers import CommentSerializer


class CommentList(APIView):
    def get(self, request):
        try:
            comments = Comment.objects.all()
            serializer = CommentSerializer(comments, many=True)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )

        except Comment.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def post(self, request):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "HTTP_201_CREATED"},
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )


class CommentDetail(APIView):
    def get(self, request, pk):
        try:
            comment = Comment.objects.get(id=pk)
            serializer = CommentSerializer(comment, many=False)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )

        except Comment.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def put(self, request, pk):
        try:
            comment = Comment.objects.get(id=pk)
            serializer = CommentSerializer(comment, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {"message": "HTTP_200_OK"},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"message": "HTTP_400_BAD_REQUEST"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Comment.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def delete(self, request, pk):
        try:
            comment = Comment.objects.get(id=pk)
            comment.delete()
            return Response(
                {"message": "HTTP_204_NO_CONTENT"},
                status=status.HTTP_204_NO_CONTENT,
            )

        except Comment.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )
