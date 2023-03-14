from django.db import models
from django.contrib.auth.models import User


class Record(models.Model):
    record_id = models.PositiveIntegerField()

    class Meta:
        abstract = True


class ImgurUser(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    username = models.CharField(max_length=30, null=True, unique=True)
    email = models.EmailField(max_length=45, unique=True)
    password = models.CharField(max_length=45)
    phone_number = models.CharField(max_length=9, unique=True, null=True)

    def __str__(self):
        return f'{self.username} {self.email}'


class Post(models.Model):
    imgurUser = models.ForeignKey(ImgurUser, on_delete=models.SET_DEFAULT, default=None)
    title = models.CharField(max_length=45)
    description = models.CharField(max_length=45)
    tag = models.CharField(max_length=45)
    expirationDate = models.DateTimeField()


class Image(models.Model):
    name = models.CharField(max_length=45)
    size = models.CharField(max_length=45)
    mimeType = models.CharField(max_length=45)
    path = models.CharField(max_length=90)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, default=None)


class Like(models.Model):
    like_count = models.PositiveIntegerField(default=0)
    dislike_count = models.PositiveIntegerField(default=0)


class Comment(models.Model):
    imgurUser = models.ForeignKey(ImgurUser, on_delete=models.SET_DEFAULT, default=None)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.CharField(max_length=140)
    like = models.ForeignKey(Like, on_delete=models.CASCADE, null=True)


class Subcomment(Record):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    user = models.ForeignKey(ImgurUser, on_delete=models.SET_DEFAULT, default=None)
    text = models.TextField()
    like = models.ForeignKey(Like, on_delete=models.CASCADE, null=True)


class Reaction(models.Model):
    user = models.ForeignKey(ImgurUser, on_delete=models.CASCADE)
    reaction = models.CharField(max_length=10)
    record_id = models.PositiveIntegerField()


models.signals.pre_delete.connect(lambda instance, **kwargs: setattr(instance, 'username', "DELETED_USER"),
                                  sender=ImgurUser)
models.signals.pre_delete.connect(lambda instance, **kwargs: setattr(instance.imgurUser, 'username', "DELETED_USER"),
                                  sender=Comment)
