from django.views.generic.base import TemplateView
from django.conf import settings


class MapView(TemplateView):
    template_name = "map/map.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["GOOGLE_API_KEY"] = settings.GOOGLE_API_KEY
        return context
