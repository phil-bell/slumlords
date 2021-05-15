from django.views.generic.base import TemplateView

from slumlords.apps.review.models import Review

# Create your views here.


class HomeView(TemplateView):
    template_name = "home/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["reviews"] = Review.objects.all().order_by("-pk")
        return context
