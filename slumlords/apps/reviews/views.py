from django.http.response import HttpResponse, HttpResponseBadRequest
from django.views.generic.base import TemplateView

from .forms import LandlordForm, PhotoForm, PropertyForm, ReviewForm
from .models import Review


class ReviewCreateView(TemplateView):
    template_name = "reviews/review_form.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["review_form"] = ReviewForm()
        context["property_form"] = PropertyForm()
        context["landlord_form"] = LandlordForm()
        context["photo_form"] = PhotoForm()
        return context

    def post(self, request):
        review = ReviewForm(request.POST)
        rental = PropertyForm(request.POST)
        landlord = LandlordForm(request.POST)
        photo = PhotoForm(request.POST)
        if (
            review.is_valid()
            and rental.is_valid()
            and landlord.is_valid()
            and photo.is_valid()
        ):
            landlord.save()
            rental.landlord = landlord
            rental.save()
            review.rental = rental
            review.save()
            photo.review = review
            photo.save()
            return HttpResponse()
        return HttpResponseBadRequest()
