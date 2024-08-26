
from django.db import models
from saleor.product.models import Product

class Author(models.Model):
    name = models.CharField(max_length=255)
    biography = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Genre(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Book(Product):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    isbn = models.CharField(max_length=13, unique=True)
    publication_date = models.DateField()
    publisher = models.CharField(max_length=255)
    genre = models.ManyToManyField(Genre)

    def __str__(self):
        return self.name
    