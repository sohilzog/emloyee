from   django.shortcuts import render
from .models import EmployeeModel,Field,Form
from .serializers import EmploySerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from empapp.serializers import EmploySerializer,UserRegisterSerializer,UserProfileSerializer,FieldSerializer,FormSerializer
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import authentication,permissions,viewsets
from django.core.mail import send_mail
from django.contrib.auth.hashers import check_password
from django.utils.crypto import get_random_string
from rest_framework.views import APIView
# Create your views here.

class UserRegisterView(ViewSet):
    def create(self,request,*args,**kwargs):
        serializer=UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        else:
            return Response(data=serializer.errors)
        
      


# og

class EmployeView(ModelViewSet):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]
    serializer_class = EmploySerializer
    queryset = EmployeeModel.objects.all()

    def create(self,request,*args,**kwargs):
            serializer = EmploySerializer(data=request.data,context={"user":request.user})
            if serializer.is_valid():
                 serializer.save()
                 return Response(data=serializer.data)
            else:
                 return Response(data=serializer.errors)




class UserProfileViewSet(viewsets.ViewSet):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]

    def list(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)
    
class ChangePasswordView(APIView):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]

    def put(self, request):
        user = request.user
        data = request.data

        current_password = data.get('currentPassword')
        new_password = data.get('newPassword')
        confirm_password = data.get('confirmPassword')

        if not check_password(current_password, user.password):
            return Response({"detail": "Current password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({"detail": "New passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        if len(new_password) < 8:
            return Response({"detail": "Password must be at least 8 characters long"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({"detail": "Password changed successfully"}, status=status.HTTP_200_OK)
    











class FormViewSet(viewsets.ModelViewSet):
    queryset = Form.objects.all()
    serializer_class = FormSerializer

    def create(self, request, *args, **kwargs):
        print(request.data)  # Log incoming request data
        return super().create(request, *args, **kwargs)


class FieldViewSet(viewsets.ModelViewSet):
    queryset = Field.objects.all()
    serializer_class = FieldSerializer




# vvvvvvvvvvvvvvvvvvvvvvv

