from rest_framework import viewsets, mixins

from ..serializers import (
    LandlordSerializer,
    PhotoSerializer,
    PointSerializer,
    PropertySerializer,
    ReviewSerializer,
)
from ..models import Landlord, Photo, Point, Property, Review


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


class PointViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Point.objects.all()
    serializer_class = PointSerializer


class PhotoViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
