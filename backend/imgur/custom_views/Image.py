import os

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Image
from ..serializers import ImageSerializer


@api_view(["GET"])
def get_images(request):
    images = Image.objects.all()
    serializer = ImageSerializer(images, many=True)
    return Response(
        serializer.data,
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
def get_image(request, pk):
    try:
        image = Image.objects.get(id=pk)
        serializer = ImageSerializer(image, many=False)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )
    except Image.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["POST"])
def create_image(request):
    serializer = ImageSerializer(data=request.data)
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
def update_image(request, pk):
    try:
        image = Image.objects.get(id=pk)
        serializer = ImageSerializer(instance=image, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(
                {"message": "HTTP_400_BAD_REQUEST"},
                status=status.HTTP_400_BAD_REQUEST,
            )
    except Image.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["DELETE"])
def delete_image(request, pk):
    try:
        image = Image.objects.get(id=pk)
        os.remove(image.path)
        image.delete()
        return Response(
            {"message": "HTTP_204_NO_CONTENT"},
            status=status.HTTP_204_NO_CONTENT,
        )
    except Image.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"},
            status=status.HTTP_404_NOT_FOUND,
        )
