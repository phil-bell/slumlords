from django.urls import path
from slumlords.apps.review.views import ReviewCreateView, ReviewListView


app_name = "review"

urlpatterns = [
    path("create/", ReviewCreateView.as_view(), name="create"),
    path("list/", ReviewListView.as_view(), name="list")
]
