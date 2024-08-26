
from django.contrib import admin
from .models import Book, Author, Genre

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('name', 'author', 'isbn', 'publisher', 'publication_date')
    search_fields = ('name', 'author__name', 'isbn')

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    