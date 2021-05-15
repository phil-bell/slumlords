import json
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http.response import HttpResponse, JsonResponse
from django.views.generic.base import TemplateView


from .forms import ReviewForm
from .models import Landlord, Property, Review


class ReviewCreateView(LoginRequiredMixin, TemplateView):
    template_name = "review/create.html"

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
        form = ReviewForm(json.loads(request.body.decode("utf-8")))
        if form.is_valid():
            self.review = form.save()
            self.landlord = form
            self.rental = form
            self.review.rental = self.rental
            self.review.tenant = request.user.tenant
            self.review.save()
            return HttpResponse()
        return JsonResponse(data=form.errors, safe=False, status=400)


class ReviewListView(LoginRequiredMixin, TemplateView):
    template_name = "review/list.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["reviews"] = Review.objects.filter(tenant__user=self.request.user)
        return context


class ReviewView(TemplateView):
    template_name = "review/view.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["review"] = Review.objects.get(pk=kwargs.get("pk"))
        return context
