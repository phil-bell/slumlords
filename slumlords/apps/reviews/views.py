from django.shortcuts import render
from django.views.generic.base import TemplateView

from .forms import ReviewForm
from .models import Review


class ReviewCreateView(TemplateView):
    template = "reviews/review_form.html"

    def get_context_data(self, **kwargs):
        


        return super().get_context_data(**kwargs)
