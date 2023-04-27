from django.apps import AppConfig


class ImgurConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'imgur'

    def ready(self):
        import imgur.signals
