from rest_framework.decorators import api_view
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate


@api_view(['GET'])
def get_imgur_users(request):
    users = ImgurUser.objects.all()
    serializer = ImgurUserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def register_user(request):
    serializer = ImgurUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'message': 'User created successfully'},
            status=status.HTTP_201_CREATED
        )
    return Response(
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['POST'])
def login(request):    
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        return Response(
            {'message': 'HTTP_200_OK'},
            status=status.HTTP_200_OK
        )
    else:
        return Response(
            {'message': 'HTTP_404_NOT_FOUND'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET'])
def get_imgur_user(request, pk):
    user = ImgurUser.objects.get(id=pk)
    serializer = ImgurUserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def get_posts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_post(request, pk):
    post = Post.objects.get(id=pk)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def get_images(request):
    images = Image.objects.all()
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_image(request, pk):
    image = Image.objects.get(id=pk)
    serializer = ImageSerializer(image, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def get_comments(request):
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_comment(request, pk):
    comment = Comment.objects.get(id=pk)
    serializer = CommentSerializer(comment, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def get_subcomments(request):
    subcomments = Subcomment.objects.all()
    serializer = SubcommentSerializer(subcomments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_subcomment(request, pk):
    subcomment = Subcomment.objects.get(id=pk)
    serializer = SubcommentSerializer(subcomment, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def get_reactions(request):
    reactions = Reaction.objects.all()
    serializer = ReactionSerializers(reactions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_reaction(request, pk):
    reaction = Reaction.objects.get(id=pk)
    serializer = ReactionSerializers(reaction, many=False)
    return Response(serializer.data)
