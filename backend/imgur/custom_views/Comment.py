from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Comment
from ..serializers import CommentSerializer

@api_view(['GET'])
def get_comments(request):
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_comment(request, pk):
    comment = Comment.objects.get(id=pk)
    serializer = CommentSerializer(comment, many=False)
    return Response(serializer.data)
