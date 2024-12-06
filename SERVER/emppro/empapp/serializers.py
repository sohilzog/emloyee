from .models import EmployeeModel,Field,Form
from rest_framework import serializers
from django.contrib.auth.models import User

# class EmploySerializer(serializers.ModelSerializer):
#     user=serializers.CharField(read_only=True)

#     class Meta:
#         model = EmployeeModel
#         fields = "__all__"
#     def create(self,validated_data):
#         user=self.context.get("user")
#         return EmployeeModel.objects.create(user=user,**validated_data)


# class UserRegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=User
#         fields=["username","email","password"]
#     def create(self,validated_data):
#              return User.objects.create_user(**validated_data)
    


# class UserProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ["username", "email"]


# class FieldSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Field
#         fields = ['id', 'label', 'field_type', 'required', 'order']

# class FormSerializer(serializers.ModelSerializer):
#     fields = FieldSerializer(many=True)  # Handle many-to-many or nested field creation

#     class Meta:
#         model = Form
#         fields = ['id', 'name', 'description', 'fields']

#     def create(self, validated_data):
#         fields_data = validated_data.pop('fields')
#         form = Form.objects.create(**validated_data)

#         for field_data in fields_data:
#             Field.objects.create(form=form, **field_data)

#         return form




# /////
class EmploySerializer(serializers.ModelSerializer):
    user=serializers.CharField(read_only=True)

    class Meta:
        model = EmployeeModel
        fields = "__all__"
    def create(self,validated_data):
        user=self.context.get("user")
        return EmployeeModel.objects.create(user=user,**validated_data)


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["username","email","password"]
    def create(self,validated_data):
             return User.objects.create_user(**validated_data)
    


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email"]


class FieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = Field
        fields = ['id', 'label', 'field_type', 'required', 'order']

class FormSerializer(serializers.ModelSerializer):
    fields = FieldSerializer(many=True)  # Handle many-to-many or nested field creation

    class Meta:
        model = Form
        fields = ['id', 'name', 'description', 'fields']

    def create(self, validated_data):
        fields_data = validated_data.pop('fields')
        form = Form.objects.create(**validated_data)

        for field_data in fields_data:
            Field.objects.create(form=form, **field_data)

        return form 