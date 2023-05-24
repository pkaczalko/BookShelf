package com.BookshelfProject.Bookshelf.book;

import com.BookshelfProject.Bookshelf.author.Author;
import com.BookshelfProject.Bookshelf.category.Category;
import com.BookshelfProject.Bookshelf.shelf.Shelf;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name="book")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(unique=true)
    private String isbn;
    private String imgURI;
    private Boolean isRead;
    private Boolean favorite;
    private String borrower;
    private Boolean wishList;
    private String publisher;
    private String coverType;
    private Integer volume;
    private Integer rating;
    private String publishedDate;
    @Lob
    @Column(columnDefinition="TEXT")
    private String description;
    private String language;
    private @NotNull int pageCount;
    private int currentPage=0;

    @ManyToOne
    @JoinColumn(name="shelf_id")
    private Shelf shelf;

    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="book_category",
            joinColumns=@JoinColumn(name="book_id"),
            inverseJoinColumns=@JoinColumn(name="category_id"))
    private Set<Category> categories=new HashSet<>();

    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="book_author",
            joinColumns=@JoinColumn(name="book_id"),
            inverseJoinColumns=@JoinColumn(name="author_id"))
    private Set<Author>authors=new HashSet<>();
}
