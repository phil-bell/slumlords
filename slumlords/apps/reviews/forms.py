from django import forms
from .models import Landlord, Property, Review, Photo

class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ["rating"]

class LandlordForm(forms.ModelForm):
    class Meta:
        model = Landlord
        fields = ["first_name", "last_name"]

class PhotoForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = ["description", "file"]

class PropertyForm(forms.ModelForm):
    class Meta:
        model = Property
        fields = ["address"]