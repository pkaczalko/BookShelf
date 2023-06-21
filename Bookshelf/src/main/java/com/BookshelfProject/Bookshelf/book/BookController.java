package com.BookshelfProject.Bookshelf.book;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping({"/books"})
public class BookController{
        private final BookService bookService;

@Autowired
public BookController(BookService bookService){
        this.bookService=bookService;
        }

@GetMapping({"/{id}"})
public Book getBook(@PathVariable Long id){
        return bookService.getById(id);
        }

@PostMapping
public Book addBook(@RequestBody Book book){
        return bookService.addBook(book);
        }

@PutMapping
public Book updateBook(@RequestParam("id")Long id,@RequestBody Book bookDetails){
        return bookService.updateBook(id,bookDetails);
        }

@DeleteMapping
public void deleteBook(@RequestParam("id")Long id){
        bookService.deleteById(id);
        }

@GetMapping("/isbns")
public List<String>getAllIsbns(){
        List<Book>books=bookService.getAllBooks();
        return books.stream().map(Book::getIsbn).collect(Collectors.toList());
        }

@GetMapping
public List<BookDTO>searchBooks(@RequestParam String q){
        List<Book>books=bookService.searchBooks(q);
        return books.stream().map(BookDTO::new).collect(Collectors.toList());
        }
        }
