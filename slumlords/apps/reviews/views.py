from django.http.response import HttpResponse, HttpResponseBadRequest
from django.views.generic.base import TemplateView
from geopy.geocoders import Nominatim


from .forms import ReviewForm
from .models import Landlord, Property

geolocator = Nominatim(user_agent="slumlords")


class ReviewCreateView(TemplateView):
    template_name = "reviews/review_form.html"

    def __init__(self, **kwargs) -> None:
        self._rental = None
        self._landlord = None
        super().__init__(**kwargs)

    @property
    def review(self):
        return self._review

    @review.setter
    def reivew(self, request):
        self._review = ReviewForm(request.POST).cleaned_data

    @property
    def landlord(self):
        return self._landlord

    @landlord.setter
    def landlord(self, review):
        self._landlord = Landlord.objects.get_or_create(
            first_name=review.get("landlord_first_name"),
            last_name=review.get("landlord_last_name"),
            postcode=review.get("landlord_postcode"),
        )

    @property
    def rental(self):
        return self._rental

    @rental.setter
    def rental(self, review):
        self._rental = Property.objects.get_or_create(
            address=review.get("property_address"), landlord=self.landlord
        )
        location = geolocator.geocode(self._rental.address.raw)
        self._rental.latitude = location.latitude
        self._rental.longatude = location.longitude
        self._rental.save()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["review_form"] = ReviewForm()
        return context

    def post(self, request):
        self.review = request
        if self.review.is_valid():
            self.landlord = self.review
            self.rental = self.review
            self.review.rental = self.rental
            self.review.tenent = self.request.user.tenent
            self.review.save()
            return HttpResponse()
        return HttpResponseBadRequest()
