from rest_framework import serializers

from .models import ImgurUser

# ImgurUser validators


def validate_email(email):
    if any(letter.isupper() for letter in email):
        raise serializers.ValidationError("Email nie może zawierać dużych liter.")

    if ImgurUser.objects.filter(email=email):
        raise serializers.ValidationError(
            "Użytkownik z takim adresem email już istnieje."
        )

    return email


def validate_username(username):
    if ImgurUser.objects.filter(username=username):
        raise serializers.ValidationError("Nazwa użytkownika jest już zajęta.")
    if len(username) < 3:
        raise serializers.ValidationError(
            "Nazwa użytkownika nie może być krótsza niż 3 znaki."
        )
    if username.isdigit():
        raise serializers.ValidationError("Nazwa użytkownika nie może być liczbą.")

    if len(username) > 45:
        raise serializers.ValidationError(
            "Nazwa użytkownika przekracza dozwoloną długość (45) znaków."
        )

    return username


def validate_password(password):
    oneNumber = any(letter.isdigit() for letter in password)
    oneBig = any(letter.isupper() for letter in password)

    if len(password) < 8:
        raise serializers.ValidationError("Hasło nie może być krótsze niż 8 znaków.")
    if not oneNumber:
        raise serializers.ValidationError(
            "Hasło powinno zawierać conajmniej jedną cyfrę."
        )
    if not oneBig:
        raise serializers.ValidationError(
            "Hasło powinno zawierać conajmniej jedną dużą literę."
        )

    return password


def validate_phone_number(phone_number):
    if not phone_number.isdigit():
        raise serializers.ValidationError("Nieprawidłowy numer telefonu.")
    if len(phone_number) != 9:
        raise serializers.ValidationError("Numer telefonu powinien zawierać 9 cyfr.")
    if ImgurUser.objects.filter(phone_number=phone_number):
        raise serializers.ValidationError("Numer telefonu jest już użyty.")

    return phone_number


def validate_first_name(first_name):
    if len(first_name) < 3:
        raise serializers.ValidationError("Imię nie może być krótsze niż 3 litery.")
    if not first_name[0].isupper():
        raise serializers.ValidationError("Imię powinno zaczynać się z dużej litery.")
    if len(first_name) > 30:
        raise serializers.ValidationError(
            "Imię przekracza dozwoloną długość (30) znaków."
        )

    return first_name


def validate_last_name(last_name):
    if len(last_name) < 2:
        raise serializers.ValidationError("Nazwisko nie może być krótsze niż 2 litery.")
    if not last_name[0].isupper():
        raise serializers.ValidationError(
            "Nazwisko powinno zaczynać się z dużej litery."
        )
    if len(last_name) > 30:
        raise serializers.ValidationError(
            "Nazwisko przekracza dozwoloną długość (30) znaków."
        )

    return last_name
