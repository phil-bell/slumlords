from rest_framework import viewsets, mixins

from ..serializers import LandlordSerializer, PropertySerializer, ReviewSerializer
from ..models import Landlord, Property, Review


class ReviewViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class LandlordViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Landlord.objects.all()
    serializer_class = LandlordSerializer


class PropertyViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
