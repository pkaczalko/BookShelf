package com.BookshelfProject.Bookshelf.book;

import com.BookshelfProject.Bookshelf.author.Author;
import com.BookshelfProject.Bookshelf.category.Category;
import com.BookshelfProject.Bookshelf.shelf.Shelf;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
public class BookDTO{
        private Long id;
        private String title;
        private String isbn;
        private String imgURI;
        private Boolean isRead;
        private Boolean favorite;
        private String borrower;
        private Boolean wishList;
        private String publisher;
        private String coverType;
        private Integer volume;
        private String publishedDate;
        private String description;
        private String language;
        private int pageCount;
        private int currentPage;
        private Shelf shelf;
        private Set<String>categories;
        private Set<String>authors;

        public BookDTO(Book book){
        this.id=book.getId();
        this.title=book.getTitle();
        this.isbn=book.getIsbn();
        this.imgURI=book.getImgURI();
        this.isRead=book.getIsRead();
        this.favorite=book.getFavorite();
        this.borrower=book.getBorrower();
        this.wishList=book.getWishList();
        this.publisher=book.getPublisher();
        this.coverType=book.getCoverType();
        this.volume=book.getVolume();
        this.publishedDate=book.getPublishedDate();
        this.description=book.getDescription();
        this.language=book.getLanguage();
        this.pageCount=book.getPageCount();
        this.currentPage=book.getCurrentPage();
        this.shelf=book.getShelf();
        this.categories=book.getCategories().stream()
        .map(Category::getName)
        .collect(Collectors.toSet());
        this.authors=book.getAuthors().stream()
        .map(Author::getName)
        .collect(Collectors.toSet());
        }
}
