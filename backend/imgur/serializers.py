from rest_framework import serializers
from .models import *
import PIL


class ImgurUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImgurUser
        fields = "__all__"
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        imgur_user = ImgurUser.objects.create(
            email=validated_data.get("username"),
            username=validated_data.get("username"),
            phone_number=validated_data.get("phone_number"),
            is_active=True,  # True - dostep do logowania, False - brak dostepu
        )
        # set_password haszuje haslo
        imgur_user.set_password(validated_data.get("password"))
        imgur_user.save()
        return imgur_user


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"

    def create(self, validated_data):
        image = validated_data.get("image")
        pil_image = PIL.Image.open(image)

        new_image = Image.objects.create(
            name=image.name,
            size=pil_image.size,
            mime_type=pil_image.format,
            image=image,
            # post=validated_data.get('post')
        )
        new_image.path = new_image.image.path
        new_image.save()

        return new_image
    
    def update(self, instance, validated_data):
        image = validated_data.get("image")
        pill_image = PIL.Image.open(image)
        
        instance.name = image.name
        instance.size = pill_image.size
        instance.mime_type = pill_image.format
        instance.image = image
        instance.path = instance.image.path
        instance.save()

        return instance


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class SubcommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcomment
        fields = "__all__"


class ReactionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = "__all__"
