from rest_framework import viewsets, mixins

from ..serializers import LandlordSerializer, ReviewSerializer
from ..models import Landlord, Review


class ReviewViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class LandlordViewset(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Landlord.objects.all()
    serializer_class = LandlordSerializer
