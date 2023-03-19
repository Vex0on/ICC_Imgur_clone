from rest_framework.decorators import api_view
from ..models import Image
from ..serializers import ImageSerializer
from rest_framework.response import Response


@api_view(['GET'])
def get_images(request):
    images = Image.objects.all()
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_image(request, pk):
    image = Image.objects.get(id=pk)
    serializer = ImageSerializer(image, many=False)
    return Response(serializer.data)
