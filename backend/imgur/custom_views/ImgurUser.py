from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models import ImgurUser
from ..serializers import ImgurUserSerializer


@api_view(['POST'])
def register_user(request):
    serializer = ImgurUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()  # aktywuje funkcje create() serializera
        return Response({
            'message': 'HTTP_201_CREATED'
        }, status=status.HTTP_201_CREATED)
    return Response({
        'message': 'HTTP_422_UNPROCESSABLE_ENTITY'
    }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # authenticate haszuje haslo z forma i sprawdza z haszowanym z baza
    user = authenticate(request, username=username, password=password)

    if user is not None:
        return Response({
            'message': 'HTTP_200_OK'
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'message': 'HTTP_404_NOT_FOUND'
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_imgur_users(request):
    users = ImgurUser.objects.all()
    serializer = ImgurUserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_imgur_user(request, pk):
    try:
        user = ImgurUser.objects.get(id=pk)
        serializer = ImgurUserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        ImgurUser.DoesNotExist
    return Response({
        'message': 'HTTP_404_NOT_FOUND'
    }, status=status.HTTP_404_NOT_FOUND)
