from django.contrib.auth import authenticate
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import ImgurUser
from ..serializers import (
    ImgurUserBaseSerializer,
    ImgurUserCreateSerializer,
    LoginSerializer,
    MyTokenObtainPairSerializer,
)


@api_view(["POST"])
def register_user(request):
    serializer = ImgurUserCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()  # aktywuje funkcje create() serializera
        return Response(
            {"message": "HTTP_201_CREATED"},
            status=status.HTTP_201_CREATED,
        )
    return Response(
        serializer.errors,
        status=status.HTTP_422_UNPROCESSABLE_ENTITY,
    )


@api_view(["POST"])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = request.data.get("email")
        password = request.data.get("password")

        # authenticate haszuje haslo z forma i sprawdza z haszowanym z baza
        user = authenticate(request, email=email, password=password)

        if user is not None:
            custom_token = MyTokenObtainPairSerializer.get_token(user)
            response = Response(
                {"access": str(custom_token.access_token)},
                status=status.HTTP_200_OK,
            )
            response.set_cookie(
                key="refresh",
                value=str(custom_token),
                httponly=True,
                samesite="Lax",
            )

            return response

        else:
            return Response(
                {"unauthorized": ["Niepoprawny email lub hasło."]},
                status=status.HTTP_401_UNAUTHORIZED,
            )
    else:
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET"])
def get_imgur_users(request):
    users = ImgurUser.objects.filter(is_superuser=False)
    serializer = ImgurUserBaseSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_imgur_user(request, pk):
    try:
        user = ImgurUser.objects.get(id=pk)
        serializer = ImgurUserBaseSerializer(user, many=False)
        return Response(serializer.data)
    except ImgurUser.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["DELETE"])
def delete_imgur_user(request, pk):
    try:
        user = ImgurUser.objects.get(id=pk)
        user.delete()
        return Response(
            {"message": "HTTP_204_NO_CONTENT"},
            status=status.HTTP_204_NO_CONTENT,
        )
    except ImgurUser.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["PUT"])
def update_imgur_user(request, pk):
    try:
        user = ImgurUser.objects.get(id=pk)
        serializer = ImgurUserBaseSerializer(instance=user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )
    except ImgurUser.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"},
            status=status.HTTP_404_NOT_FOUND,
        )
