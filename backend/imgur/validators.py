from rest_framework import serializers
from .models import ImgurUser

# ImgurUser validators


def validate_email(email):
    email_ends = [".com", ".pl"]

    if not "@" in email:
        raise serializers.ValidationError({"error": "W emailu brakuje znaku '@'."})
    else:
        after_monkey_letter = email.index("@") + 1
        if email[after_monkey_letter] == ".":
            raise serializers.ValidationError({"error": "Niepoprawny email."})
        elif len(email) < 7:
            raise serializers.ValidationError({"error": "Email jest za krótki."})
        elif not any(email.endswith(end) for end in email_ends):
            raise serializers.ValidationError({"error": "Niepoprawny email."})

    return email


def validate_username(username):
    if ImgurUser.objects.filter(username=username):
        raise serializers.ValidationError(
            {"error": "Nazwa użytkownika jest już zajęta."}
        )
    elif len(username) < 3:
        raise serializers.ValidationError(
            {"error": "Nazwa użytkownika nie może być krótsza niż 3 znaki."}
        )
    elif username.isdigit():
        raise serializers.ValidationError(
            {"error": "Nazwa użytkownika nie może być liczbą."}
        )

    return username


def validate_password(password):
    if len(password) < 8:
        raise serializers.ValidationError(
            {"error": "Hasło nie może być krótsze niż 8 znaków."}
        )
    if not password:
        raise serializers.ValidationError({"error": "To pole nie puste"})

    return password


def validate_phone_number(phone_number):
    if not phone_number.isdigit():
        raise serializers.ValidationError({"error": "Nieprawidłowy numer telefonu."})
    elif len(phone_number) != 9:
        raise serializers.ValidationError(
            {"error": "Numer telefonu powinien zawierać 9 cyfr."}
        )

    return phone_number
