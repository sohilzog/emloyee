from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class EmployeeModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    phone_number = models.CharField(max_length=20)
    place = models.CharField(max_length=200)

                                
class Form(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Field(models.Model):
    TEXT = 'text'
    NUMBER = 'number'
    DATE = 'date'
    PASSWORD = 'password'

    FIELD_TYPES = [
        (TEXT, 'Text'),
        (NUMBER, 'Number'),
        (DATE, 'Date'),
        (PASSWORD, 'Password'),
    ]

    form = models.ForeignKey(Form, related_name='fields', on_delete=models.CASCADE)
    label = models.CharField(max_length=255)
    field_type = models.CharField(max_length=50, choices=FIELD_TYPES)
    required = models.BooleanField(default=False)
    order = models.IntegerField()

    def __str__(self):
        return f'{self.label} ({self.field_type})'
    


