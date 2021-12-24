from django.db import models

class User(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.TextField()
  age = models.TextField()
  poto = models.ImageField(blank=True, upload_to="images", null=True)