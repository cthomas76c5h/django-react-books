from django.db import models

class Book(models.Model):
    isbn = models.TextField()
    title = models.TextField()
    author = models.TextField()
    cover = models.TextField()
    rating = models.IntegerField()
