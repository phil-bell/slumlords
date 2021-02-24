from django.db import models
from django.contrib.auth.models import User


from address.models import AddressField


class Property(models.Model):
    address = AddressField(on_delete=models.CASCADE)
    latitude = models.FloatField(
        null=True,
        blank=True,
    )
    longitude = models.FloatField(
        null=True,
        blank=True,
    )
    landlord = models.ForeignKey(
        "Landlord",
        related_name="properties",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )
    rating = models.PositiveIntegerField(
        null=True,
        blank=True,
    )


class Landlord(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    rating = models.PositiveIntegerField(
        null=True,
        blank=True,
    )


class Point(models.Model):
    positive = models.BooleanField(default=False)
    description = models.TextField(
        null=True,
        blank=True,
    )
    review = models.ForeignKey(
        "Review",
        related_name="points",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )


class Photo(models.Model):
    description = models.TextField(
        null=True,
        blank=True,
    )
    file = models.FileField(
        null=True,
        blank=True,
    )
    review = models.ForeignKey(
        "Review",
        related_name="photos",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )


class Review(models.Model):
    rating = models.PositiveIntegerField(
        null=True,
        blank=True,
    )
    submitted_at = models.TimeField(
        null=True,
        blank=True,
    )
    rental = models.ForeignKey(
        "Property",
        related_name="reviews",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )


class Tenant(models.Model):
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.SET_NULL)

    @property
    def name(self):
        return f"{self.user.first_name} {self.user.last_name}"
