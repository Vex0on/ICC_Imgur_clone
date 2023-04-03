from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from ..models import ImgurUser
from ..serializers import ImgurUserSerializer


@api_view(["POST"])
def register_user(request):
    serializer = ImgurUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()  # aktywuje funkcje create() serializera
        return Response({"message": "HTTP_201_CREATED"}, status=status.HTTP_201_CREATED)
    return Response(
        {"message": "HTTP_422_UNPROCESSABLE_ENTITY"},
        status=status.HTTP_422_UNPROCESSABLE_ENTITY,
    )


@api_view(["POST"])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    # authenticate haszuje haslo z forma i sprawdza z haszowanym z baza
    user = authenticate(request, email=email, password=password)

    if user is not None:
        access_token = AccessToken.for_user(user)
        refresh_token = RefreshToken.for_user(user)
        response = Response(
            {"access_token": str(access_token)}, status=status.HTTP_200_OK
        )
        response.set_cookie(
            key="refresh_token", value=str(refresh_token), httponly=True
        )

        return response

    else:
        return Response(
            {"message": "HTTP_401_UNAUTHORIZED"}, status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(["GET"])
def get_imgur_users(request):
    users = ImgurUser.objects.filter(is_superuser=False)
    serializer = ImgurUserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_imgur_user(request, pk):
    try:
        user = ImgurUser.objects.get(id=pk)
        serializer = ImgurUserSerializer(user, many=False)
        return Response(serializer.data)
    except ImgurUser.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["DELETE"])
def delete_imgur_user(request, pk):
    try:
        user = ImgurUser.objects.get(id=pk)
        user.delete()
        return Response(
            {"message": "HTTP_204_NO_CONTENT"}, status=status.HTTP_204_NO_CONTENT
        )
    except ImgurUser.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["PUT"])
def update_imgur_user(request, pk):
    try:
        user = ImgurUser.objects.get(id=pk)
        serializer = ImgurUserSerializer(instance=user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(
                {"message": "HTTP_400_BAD_REQUEST"}, status=status.HTTP_400_BAD_REQUEST
            )
    except ImgurUser.DoesNotExist:
        return Response(
            {"message": "HTTP_404_NOT_FOUND"}, status=status.HTTP_404_NOT_FOUND
        )
