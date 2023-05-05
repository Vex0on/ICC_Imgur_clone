from django.contrib.auth.models import AbstractUser
from django.db import models


class Record(models.Model):
    record_id = models.PositiveIntegerField()

    class Meta:
        abstract = True


class ImgurUser(AbstractUser):
    phone_number = models.CharField(max_length=9, unique=True, null=True)
    email = models.EmailField(unique=True, null=True)
    username = models.CharField(max_length=45, unique=True, null=True, blank=True)
    password = models.CharField(max_length=255, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email


class Post(Record):
    imgur_user = models.ForeignKey(
        ImgurUser, on_delete=models.SET_DEFAULT, default=None, null=True
    )
    title = models.CharField(max_length=45)
    description = models.CharField(max_length=45)
    tag = models.CharField(max_length=45)
    expirationDate = models.DateTimeField()
    like_count = models.IntegerField(default=0)
    dislike_count = models.IntegerField(default=0)
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)


class Image(models.Model):
    name = models.CharField(max_length=45, null=True)
    size = models.CharField(max_length=45, null=True)
    mime_type = models.CharField(max_length=45, null=True)
    path = models.CharField(max_length=90, null=True)
    image = models.ImageField(upload_to="images")
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        default=None,
        null=True,
        blank=True,
        related_name="images",
    )


class Comment(Record):
    imgur_user = models.ForeignKey(
        ImgurUser,
        on_delete=models.SET_DEFAULT,
        default=None,
    )
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="comments",
    )
    text = models.CharField(max_length=140)
    like_count = models.IntegerField(default=0)
    dislike_count = models.IntegerField(default=0)
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)


class Subcomment(Record):
    comment = models.ForeignKey(
        Comment,
        on_delete=models.CASCADE,
        related_name="subcomments",
    )
    imgur_user = models.ForeignKey(
        ImgurUser,
        on_delete=models.SET_DEFAULT,
        default=None,
    )
    text = models.CharField(max_length=140)
    like_count = models.IntegerField(default=0)
    dislike_count = models.IntegerField(default=0)
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)


class Reaction(models.Model):
    imgur_user = models.ForeignKey(
        ImgurUser,
        on_delete=models.CASCADE,
        related_name="reactions",
    )
    reaction = models.BooleanField(null=True)
    record_id = models.PositiveIntegerField()


models.signals.pre_delete.connect(
    lambda instance, **kwargs: setattr(instance, "username", "DELETED_USER"),
    sender=ImgurUser,
)
models.signals.pre_delete.connect(
    lambda instance, **kwargs: setattr(instance.ImgurUser, "username", "DELETED_USER"),
    sender=Comment,
)
