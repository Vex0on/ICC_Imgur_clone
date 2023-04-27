from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Comment
from ..serializers import CommentSerializer
from rest_framework.views import APIView


class CommentList(APIView):
    def get(self, request):
        try:
            comments = Comment.objects.all()
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Comment.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"}, status=status.HTTP_404_NOT_FOUND
            )

    def post(self, request):
        try:
            serializer = CommentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(
                    serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY
                )

        except Comment.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"}, status=status.HTTP_404_NOT_FOUND
            )


class CommentDetail(APIView):
    def get(self, request, pk):
        try:
            comment = Comment.objects.get(id=pk)
            serializer = CommentSerializer(comment, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Comment.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, pk):
        try:
            comment = Comment.objects.get(id=pk)
            serializer = CommentSerializer(comment, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"message": "HTTP_400_BAD_REQUEST"}, status=status.HTTP_400_BAD_REQUEST
                )
        except Comment.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"}, status=status.HTTP_404_NOT_FOUND
            )

    def delete(self, request, pk):
        try:
            comment = Comment.objects.get(id=pk)
            comment.delete()
            return Response({"message": "HTTP_204_NO_CONTENT"}, status=status.HTTP_204_NO_CONTENT)

        except Comment.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"}, status=status.HTTP_404_NOT_FOUND
            )
