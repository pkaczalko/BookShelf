package com.BookshelfProject.Bookshelf.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BookService {
    private final BookRepository bookRepository;
    // private final BookGenreService bookGenreService;
    // private final GenreService genreService;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getById(Long id) {
        return bookRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Book not found with id " + id));
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public Book updateBook(Long id, Book bookDetails) {
        Book book = getById(id);
        book.setIsbn(bookDetails.getIsbn());
        book.setIsRead(bookDetails.getIsRead());
        book.setFavorite(bookDetails.getFavorite());
        book.setBorrower(bookDetails.getBorrower());
        book.setWishList(bookDetails.getWishList());
        book.setPublisher(bookDetails.getPublisher());
        book.setCoverType(bookDetails.getCoverType());
        book.setVolume(bookDetails.getVolume());
        book.setPublishingDate(bookDetails.getPublishingDate());
        book.setShelf(bookDetails.getShelf());
        //book.setUser(bookDetails.getUser());
        return bookRepository.save(book);
    }

    public void delete(Long id) {
        bookRepository.deleteById(id);
    }
}
