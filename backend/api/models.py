from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.

class UserData(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True) # saves date upon creation
    updated_at = models.DateTimeField(auto_now=True) # saves date upon every update
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    analyzed_text = models.TextField(default="")
    is_public = models.BooleanField(default=False)