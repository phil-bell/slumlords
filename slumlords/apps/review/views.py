import json
from django.http.response import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.views.generic.base import TemplateView
from geopy.geocoders import Nominatim


from .forms import ReviewForm
from .models import Landlord, Property


class ReviewCreateView(TemplateView):
    template_name = "review/review_form.html"

    def __init__(self, **kwargs) -> None:
        self._rental = None
        self._landlord = None
        self._review = None
        super().__init__(**kwargs)

    @property
    def landlord(self):
        return self._landlord

    @landlord.setter
    def landlord(self, review):
        obj, created = Landlord.objects.get_or_create(
            first_name=review.cleaned_data.get("landlord_first_name"),
            last_name=review.cleaned_data.get("landlord_last_name"),
            postcode=review.cleaned_data.get("landlord_postcode"),
        )
        self._landlord = obj

    @property
    def rental(self):
        return self._rental

    @rental.setter
    def rental(self, review):
        obj, created = Property.objects.get_or_create(
            address=review.cleaned_data.get("property_address"), landlord=self.landlord
        )
        self._rental = obj
        self._rental.save()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["review_form"] = ReviewForm()
        return context

    def post(self, request):
        self.review = ReviewForm(json.loads(request.body.decode("utf-8")))
        if self.review.is_valid():
            self.landlord = self.review
            self.rental = self.review
            self.review.rental = self.rental
            # self.review.tenent = self.request.user.tenent
            self.review.save()
            return HttpResponse()
        return JsonResponse(data=self.review.errors, safe=False, status=400)
