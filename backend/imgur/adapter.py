from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings


class CustomAllauthAdapter(DefaultAccountAdapter):
    def send_mail(self, template_prefix, email, context):
        account_confirm_email = '/accounts/confirm-email/'
        context['activate_url'] = (
            settings.BASE_URL + account_confirm_email + context['key'] + '/'
        )
        msg = self.render_mail(template_prefix, email, context)
        msg.send()