from django.dispatch import receiver
from django.db.models.signals import pre_save
from django.db.models import Avg
from .models import Review, Property


@receiver(pre_save, sender=Review)
def update_property_rating(sender, instance, **kwargs):
    instance.rental.rating = instance.rental.review.objects.aggregate(Avg("rating"))
    instance.rental.save()


@receiver(pre_save, sender=Property)
def update_landlord_rating(sender, instance, **kwargs):
    instance.landlord.rating = instance.landlord.properties.objects.aggregate(
        Avg("rating")
    )
    instance.landlord.save()
