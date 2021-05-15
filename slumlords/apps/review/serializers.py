from rest_framework import serializers

from .models import Landlord, Property, Review


class LandlordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Landlord
        fields = ["first_name", "last_name", "postcode", "rating"]

class PropertySerializer(serializers.ModelSerializer):
    landlord = LandlordSerializer()

    class Meta:
        model = Property
        fields = [
            "address",
            "landlord",
            "rating",
        ]

class ReviewSerializer(serializers.ModelSerializer):
    rental = PropertySerializer()

    class Meta:
        model = Review
        fields = ["rating", "submitted_at", "description", "rent", "rental"]
