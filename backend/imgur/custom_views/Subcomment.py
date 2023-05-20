from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Subcomment
from ..serializers import SubcommentSerializer


@api_view(["GET"])
def get_subcomments(request):
    subcomments = Subcomment.objects.all()
    serializer = SubcommentSerializer(subcomments, many=True)
    return Response(
        serializer.data,
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
def get_subcomment(request, pk):
    try:
        subcomment = Subcomment.objects.get(id=pk)
        serializer = SubcommentSerializer(subcomment, many=False)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )
    except Subcomment.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["POST"])
def create_subcomment(request):
    serializer = SubcommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )
    return Response(
        serializer.errors,
        status=status.HTTP_422_UNPROCESSABLE_ENTITY,
    )


@api_view(["PUT"])
def update_subcomment(request, pk):
    try:
        subcomment = Subcomment.objects.get(id=pk)
        serializer = SubcommentSerializer(instance=subcomment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )
    except Subcomment.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["DELETE"])
def delete_subcomment(request, pk):
    try:
        subcomment = Subcomment.objects.get(id=pk)
        subcomment.delete()
        return Response(
            {"message": "HTTP_204_NO_CONTENT"},
            status=status.HTTP_204_NO_CONTENT,
        )
    except Subcomment.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"},
            status=status.HTTP_404_NOT_FOUND,
        )
