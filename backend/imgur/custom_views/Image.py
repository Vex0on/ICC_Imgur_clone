from rest_framework import status
from rest_framework.decorators import api_view
from ..models import Image
from ..serializers import ImageSerializer
from rest_framework.response import Response


@api_view(["GET"])
def get_images(request):
    images = Image.objects.all()
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_image(request, pk):
    image = Image.objects.get(id=pk)
    serializer = ImageSerializer(image, many=False)
    return Response(serializer.data)


@api_view(["POST"])
def create_image(request):
    serializer = ImageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "HTTP_201_CREATED"}, status=status.HTTP_201_CREATED)
    return Response({"message": "HTTP_422_UNPROCESSABLE_ENTITY"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


@api_view(["PUT"])
def update_image(request, pk):
    serializer = ImageSerializer(data=request.data)
    image = Image.objects.get(id=pk)
    if serializer.is_valid() and image is not None:
        serializer.update(image, serializer.data)
        return Response({"message": "HTTP_200_OK"}, status=status.HTTP_200_OK)
    return Response({"message": "HTTP_422_UNPROCESSABLE_ENTITY"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


@api_view(["DELETE"])
def delete_image(request, pk):
    image = Image.objects.get(id=pk)
    image.delete()
    return Response({"message": "HTTP_200_OK"}, status=status.HTTP_200_OK)




