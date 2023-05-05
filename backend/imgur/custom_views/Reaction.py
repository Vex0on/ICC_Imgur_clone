from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Reaction
from ..serializers import ReactionSerializers


class ReactionList(APIView):
    def get(self, request):
        try:
            reactions = Reaction.objects.all()
            serializer = ReactionSerializers(reactions, many=True)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )
        except Reaction.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def post(self, request, pk):
        try:
            reaction = Reaction.objects.get(id=pk)
            serializer = ReactionSerializers(reaction, many=False)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data,
                    status=status.HTTP_201_CREATED,
                )
            else:
                return Response(
                    {"message": "HTTP_400_BAD_REQUEST"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Reaction.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )


class ReactionDetail(APIView):
    def get(self, request, pk):
        try:
            reaction = Reaction.objects.get(id=pk)
            serializer = ReactionSerializers(reaction, many=False)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )
        except Reaction.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def put(self, request, pk):
        try:
            reaction = Reaction.objects.get(id=pk)
            serializer = ReactionSerializers(reaction, many=False, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"message": "HTTP_400_BAD_REQUEST"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Reaction.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def delete(self, request, pk):
        try:
            reaction = Reaction.objects.get(id=pk)
            reaction.delete()
            return Response(
                status=status.HTTP_204_NO_CONTENT,
            )
        except Reaction.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )
