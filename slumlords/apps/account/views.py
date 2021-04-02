from django.contrib.auth.views import LoginView

# Create your views here.
class Login(LoginView):
    template_name = "account/login.html"
    redirect_authenticated_user = True
