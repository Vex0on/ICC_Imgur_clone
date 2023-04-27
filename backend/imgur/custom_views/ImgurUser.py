from allauth.account.models import EmailAddress
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response

from ..models import ImgurUser
from ..serializers import (
    ImgurUserBaseSerializer,
    ImgurUserCreateSerializer,
    MyTokenObtainPairSerializer,
)


@api_view(["POST"])
def register_user(request):
    serializer = ImgurUserCreateSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()  # aktywuje funkcje create() serializera
        email_address = EmailAddress.objects.get(user=user, primary=True)
        email_address.send_confirmation()
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
    email = request.data.get("email")
    password = request.data.get("password")

    user = ImgurUser.objects.filter(email=email).first()

    if user is None:
        raise AuthenticationFailed("User not found.")

    if not user.check_password(password):
        raise AuthenticationFailed("Incorrect password.")

    if not user.is_active:
        raise AuthenticationFailed("Confirm your email.")

    user.last_login = timezone.now()
    user.save(update_fields=["last_login"])

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
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )
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
