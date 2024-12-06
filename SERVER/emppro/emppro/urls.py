"""
URL configuration for empproject project.

The urlpatterns list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from empapp import views
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register("register", views.UserRegisterView, basename="user_view")
router.register("employee", views.EmployeView, basename="emp_view")
router.register("profile", views.UserProfileViewSet, basename="user-profile") 
router.register('forms', views.FormViewSet)
router.register('fields', views.FieldViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token', obtain_auth_token),
    path('change-password/', views.ChangePasswordView.as_view(), name='change-password'),    # Added a comma here and a trailing slash for consistency
] + router.urls