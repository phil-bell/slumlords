from django.urls import path
from slumlords.apps.review.views import ReviewCreateView


app_name = "review"

urlpatterns = [
    path("create/", ReviewCreateView.as_view(), name="create"),
]
