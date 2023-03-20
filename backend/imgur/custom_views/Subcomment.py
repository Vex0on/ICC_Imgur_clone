from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Subcomment
from ..serializers import SubcommentSerializer


@api_view(["GET"])
def get_subcomments(request):
    subcomments = Subcomment.objects.all()
    serializer = SubcommentSerializer(subcomments, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_subcomment(request, pk):
    subcomment = Subcomment.objects.get(id=pk)
    serializer = SubcommentSerializer(subcomment, many=False)
    return Response(serializer.data)
