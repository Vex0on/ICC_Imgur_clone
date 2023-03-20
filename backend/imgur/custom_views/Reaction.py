from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Reaction
from ..serializers import ReactionSerializers


@api_view(["GET"])
def get_reactions(request):
    reactions = Reaction.objects.all()
    serializer = ReactionSerializers(reactions, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_reaction(request, pk):
    reaction = Reaction.objects.get(id=pk)
    serializer = ReactionSerializers(reaction, many=False)
    return Response(serializer.data)
