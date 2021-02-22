from django.db import models
from django.contrib.auth.models import User
from django.contrib.gis.db.models import PointField

from address.models import AddressField

class Property(models.Model):
    address = AddressField(on_delete=models.CASCADE)
    latitude = models.FloatField()
    longitude = models.FloatField()
    landlord = models.ForeignKey("Landlord", related_name="properties", null=True, blank=True, on_delete=models.SET_NULL)

    @property
    def rating(self):
        return self.reviews.aggregate(Avg('rating')).values()[0]

class Landlord(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)

    @property
    def rating(self):
        return self.reviews.aggregate(Avg('rating')).values()[0]

class Point(models.Model):
    positive = models.BooleanField(default=False)
    description = models.TextField()
    review = models.ForeignKey("Review", related_name="points", null=True, blank=True, on_delete=models.SET_NULL)

class Photo(models.Model):
    description = models.TextField()
    file = models.FileField()
    review = models.ForeignKey("Review", related_name="photos", null=True, blank=True, on_delete=models.SET_NULL)

class Review(models.Model):
    rating = models.PositiveIntegerField()
    submitted_at = models.TimeField()
    rental = models.ForeignKey("Property", related_name="reviews", null=True, blank=True, on_delete=models.SET_NULL)

class Tenant(models.Model):
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.SET_NULL)

    @property
    def name(self):
        return f"{self.user.first_name} {self.user.last_name}"

