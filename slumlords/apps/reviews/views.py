from django.shortcuts import render
from django.views.generic.edit import CreateView

from .forms import ReviewForm
from .models import Review


class ReviewCreateView(CreateView):
    model = Review
    form_class = ReviewForm
