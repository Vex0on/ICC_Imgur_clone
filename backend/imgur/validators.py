import PIL
from rest_framework import serializers

from .models import ImgurUser

# ImgurUser validators


def validate_email(email):
    if any(letter.isupper() for letter in email):
        raise serializers.ValidationError("Email cannot contain capital letters.")

    # if ImgurUser.objects.filter(email=email):
    #     raise serializers.ValidationError(
    #         "A user with this email address already exists."
    #     )

    return email


def validate_username(username):
    # if ImgurUser.objects.filter(username=username):
    #     raise serializers.ValidationError("The username is already taken.")
    if len(username) < 3:
        raise serializers.ValidationError(
            "The username cannot be shorter than 3 characters."
        )
    if username.isdigit():
        raise serializers.ValidationError("The username cannot be a number.")

    if len(username) > 45:
        raise serializers.ValidationError(
            "The username cannot be longer than (45) characters."
        )

    return username


def validate_password(password):
    oneNumber = any(letter.isdigit() for letter in password)
    oneBig = any(letter.isupper() for letter in password)

    if len(password) < 8:
        raise serializers.ValidationError(
            "The password cannot be shorter than 8 characters."
        )
    if not oneNumber:
        raise serializers.ValidationError(
            "The password should contain at least one number."
        )
    if not oneBig:
        raise serializers.ValidationError(
            "The password should contain at least one capital letter."
        )

    return password


def validate_phone_number(phone_number):
    if not phone_number.isdigit():
        raise serializers.ValidationError("Invalid phone number.")
    if len(phone_number) != 9:
        raise serializers.ValidationError("The phone number should contain 9 digits.")
    # if ImgurUser.objects.filter(phone_number=phone_number):
    #     raise serializers.ValidationError("The phone number is already used.")

    return phone_number


def validate_first_name(first_name):
    if len(first_name) < 3:
        raise serializers.ValidationError("The name cannot be shorter than 3 letters.")
    if not first_name[0].isupper():
        raise serializers.ValidationError(
            "The name should start with a capital letter."
        )
    if len(first_name) > 30:
        raise serializers.ValidationError(
            "The name cannot be longer than (30) characters."
        )

    return first_name


def validate_last_name(last_name):
    if len(last_name) < 2:
        raise serializers.ValidationError(
            "The last name cannot be shorter than 2 letters."
        )
    if not last_name[0].isupper():
        raise serializers.ValidationError(
            "The last name should start with a capital letter."
        )
    if len(last_name) > 30:
        raise serializers.ValidationError(
            "The last name cannot be longer than (30) characters."
        )

    return last_name


def validate_image(image):
    allowed_extensions = ["PNG", "GIF", "JPEG"]

    pil_image = PIL.Image.open(image)
    if pil_image.format not in allowed_extensions:
        raise serializers.ValidationError("Allowed formats: PNG, GIF, JPEG.")


def validate_image_name(image):
    if len(image.name) > 45:
        raise serializers.ValidationError(
            "The file name cannot be longer than (45) characters."
        )
