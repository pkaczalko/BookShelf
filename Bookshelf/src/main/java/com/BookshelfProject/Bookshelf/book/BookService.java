package com.BookshelfProject.Bookshelf.book;

import com.BookshelfProject.Bookshelf.author.Author;
import com.BookshelfProject.Bookshelf.author.AuthorRepository;
import com.BookshelfProject.Bookshelf.category.Category;
import com.BookshelfProject.Bookshelf.category.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookService {
    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;
    private final AuthorRepository authorRepository;

    @Autowired
    public BookService(BookRepository bookRepository, CategoryRepository categoryRepository, AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.categoryRepository = categoryRepository;
        this.authorRepository = authorRepository;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getById(Long id) {
        return bookRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Book not found with id " + id));
    }

    public Book addBook(Book book) {
        Set<Category> categories = new HashSet<>();
        for (Category category : book.getCategories()) {
            Optional<Category> existingCategory  = categoryRepository.findByName(category.getName());
            if (existingCategory.isPresent()) {
                categories.add(existingCategory.get());
            } else {
                categories.add(category);
            }
        }
        book.setCategories(categories);

        Set<Author> authors = new HashSet<>();
        for (Author author : book.getAuthors()) {
            Optional<Author> existingAuthor = authorRepository.findByName(author.getName());
            if (existingAuthor.isPresent()) {
                authors.add(existingAuthor.get());
            } else {
                authors.add(author);
            }
        }
        book.setAuthors(authors);

        return bookRepository.save(book);
    }

    public Book updateBook(String isbn, Book bookDetails) {
        Book book = getByIsbn(isbn);
        book.setIsbn(bookDetails.getIsbn());
        book.setImgURI(bookDetails.getImgURI());
        book.setIsRead(bookDetails.getIsRead());
        book.setFavorite(bookDetails.getFavorite());
        book.setBorrower(bookDetails.getBorrower());
        book.setWishList(bookDetails.getWishList());
        book.setPublisher(bookDetails.getPublisher());
        book.setCoverType(bookDetails.getCoverType());
        book.setVolume(bookDetails.getVolume());
        book.setPublishedDate(bookDetails.getPublishedDate());
        book.setShelf(bookDetails.getShelf());
        //book.setUser(bookDetails.getUser());

        Set<Category> categories = new HashSet<>();
        for (Category category : bookDetails.getCategories()) {
            Optional<Category> existingCategory  = categoryRepository.findByName(category.getName());
            if (existingCategory.isPresent()) {
                categories.add(existingCategory.get());
            } else {
                categories.add(category);
            }
        }
        book.setCategories(categories);

        Set<Author> authors = new HashSet<>();
        for (Author author : bookDetails.getAuthors()) {
            Optional<Author> existingAuthor = authorRepository.findByName(author.getName());
            if (existingAuthor.isPresent()) {
                authors.add(existingAuthor.get());
            } else {
                authors.add(author);
            }
        }
        book.setAuthors(authors);

        return bookRepository.save(book);
    }

    @Transactional
    public void deleteByIsbn(String isbn) {
        bookRepository.deleteByIsbn(isbn);
    }

    public List<String> getAllIsbn() {
        return bookRepository.findAll().stream().map(Book::getIsbn).collect(Collectors.toList());
    }

    public Book getByIsbn(String isbn) {
        return bookRepository.findByIsbn(isbn).orElseThrow(() -> new NoSuchElementException("Book not found with isbn " + isbn));
    }

    public List<Book> searchBooks(String q) {
        if(q == null || q.isEmpty()){
            return bookRepository.findAll();
        } else {
            return bookRepository.searchBooks(q);
        }
    }
}