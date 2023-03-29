from rest_framework import status
from rest_framework.decorators import api_view
from ..models import Image
from ..serializers import ImageSerializer
from rest_framework.response import Response


@api_view(["GET"])
def get_images(request):
    images = Image.objects.all()
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_image(request, pk):
    try:
        image = Image.objects.get(id=pk)
        serializer = ImageSerializer(image, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Image.DoesNotExist:
        return Response({
            'message': 'HTTP_404_NOT_FOUND'
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
def create_image(request):
    serializer = ImageSerializer(data=request.data)
    if serializer.is_valid():
        image = serializer.save()
        return Response(image.path, status=status.HTTP_201_CREATED)
    return Response({"message": "HTTP_422_UNPROCESSABLE_ENTITY"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


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
                {"message": "HTTP_400_BAD_REQUEST"}, status=status.HTTP_400_BAD_REQUEST
            )
    except Image.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["DELETE"])
def delete_image(request, pk):
    try:
        image = Image.objects.get(id=pk)
        image.delete()
        return Response(
            {"message": "HTTP_204_NO_CONTENT"}, status=status.HTTP_204_NO_CONTENT
        )
    except Image.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"}, status=status.HTTP_404_NOT_FOUND
        )
