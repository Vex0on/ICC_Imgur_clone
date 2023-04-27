from django.dispatch import receiver
from allauth.account.signals import email_confirmed
from django.contrib.auth import get_user_model


@receiver(email_confirmed)
def email_confirmed_(request, email_address, **kwargs):
    User = get_user_model()
    user = User.objects.get(email=email_address.email)
    user.is_active = True
    user.save()