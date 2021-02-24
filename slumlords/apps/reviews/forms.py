from django import forms

from .models import Landlord, Property, Review

class LandlordForm(forms.ModelForm):
    class Meta:
        model = Landlord
        fields = ["first_name", "last_name"]

class ProperyForm(forms.ModelForm):
    landlord = LandlordForm()

    class Meta:
        model = Property
        fields = ["landlord"]

class ReviewForm(forms.ModelForm):
    rental = ProperyForm()

    class Meta:
        model = Review
        fields = ["rating", "rental"]