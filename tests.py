
from django.test import TestCase
from .models import Book, Author, Genre

class BookModelTest(TestCase):
    def setUp(self):
        self.author = Author.objects.create(name="J.K. Rowling")
        self.genre = Genre.objects.create(name="Fantasy")
        self.book = Book.objects.create(name="Harry Potter", author=self.author, isbn="1234567890123", publisher="Bloomsbury")

    def test_book_creation(self):
        self.book.genre.add(self.genre)
        self.assertEqual(self.book.name, "Harry Potter")
        self.assertEqual(self.book.author.name, "J.K. Rowling")
        self.assertEqual(self.book.isbn, "1234567890123")
    