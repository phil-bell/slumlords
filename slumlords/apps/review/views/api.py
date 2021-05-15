from rest_framework import viewsets, mixins

from ..serializers import ReviewSerializer
from ..models import Review


class ReviewViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
