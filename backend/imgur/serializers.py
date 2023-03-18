from rest_framework import serializers
from .models import *


class ImgurUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImgurUser
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        email = validated_data.get('email')
        if ImgurUser.objects.filter(email=email).exists():
            raise serializers.ValidationError("A user with that email address already exists.")
        imgur_user = ImgurUser.objects.create(**validated_data)
        imgur_user.save()
        return imgur_user


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class SubcommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcomment
        fields = '__all__'


class ReactionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = '__all__'
