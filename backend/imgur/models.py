from django.db import models


class ImgurUser(models.Model):
    username = models.CharField(max_length=30)
    email = models.EmailField(max_length=45)
    password = models.CharField(max_length=45)
    phone_number = models.IntegerField()

    def __str__(self):
        return f'{self.username} {self.email}'


class Post(models.Model):
    imgurUser = models.ForeignKey(ImgurUser, on_delete=models.SET_DEFAULT, default=None)
    title = models.CharField(max_length=45)
    description = models.CharField(max_length=45)
    tag = models.CharField(max_length=45)
    expirationDate = models.DateTimeField()


class Comment(models.Model):
    imgurUser = models.ForeignKey(ImgurUser, on_delete=models.SET_DEFAULT, default=None)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.CharField(max_length=140)


models.signals.pre_delete.connect(lambda instance, **kwargs: setattr(instance, 'username', "DELETED_USER"),
                                  sender=ImgurUser)
models.signals.pre_delete.connect(lambda instance, **kwargs: setattr(instance.imgurUser, 'username', "DELETED_USER"),
                                  sender=Comment)
