from rest_framework import serializers

from .models import Landlord, Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["rating", "submitted_at", "description", "rent"]


class LandlordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Landlord
        fields = [
            "first_name",
            "last_name",
            "postcode",
            "rating",
        ]

