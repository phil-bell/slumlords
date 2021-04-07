from django import forms
from address.forms import AddressField

from .models import Landlord, Property, Review, Photo


class ReviewForm(forms.ModelForm):
    property_address = AddressField()
    landlord_first_name = forms.CharField()
    landlord_last_name = forms.CharField()
    landlord_postcode = forms.CharField()

    class Meta:
        model = Review
        fields = [
            "rating",
            "property_address",
            "landlord_first_name",
            "landlord_last_name",
            "description"
        ]


class LandlordForm(forms.ModelForm):
    class Meta:
        model = Landlord
        fields = ["first_name", "last_name", "postcode"]


class PhotoForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = ["description", "file", "review"]


class PropertyForm(forms.ModelForm):
    class Meta:
        model = Property
        fields = ["address", "landlord"]