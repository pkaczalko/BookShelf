package com.BookshelfProject.Bookshelf.book;

import jakarta.persistence.TypedQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByIsbn(String isbn);

    void deleteByIsbn(String isbn);

    @Query("SELECT DISTINCT b FROM Book b " +
            "LEFT JOIN FETCH b.categories c " +
            "LEFT JOIN FETCH b.authors a " +
            "LEFT JOIN FETCH b.shelf s " +
            "WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :q, '%')) " +
            "OR LOWER(b.publisher) LIKE LOWER(CONCAT('%', :q, '%')) " +
            "OR LOWER(b.isbn) LIKE LOWER(CONCAT('%', :q, '%')) " +
            "OR LOWER(c.name) LIKE LOWER(CONCAT('%', :q, '%')) " +
            "OR LOWER(a.name) LIKE LOWER(CONCAT('%', :q, '%')) " +
            "OR LOWER(s.name) LIKE LOWER(CONCAT('%', :q, '%')) " +
            "ORDER BY b.title ASC " +
            "LIMIT 10")
    List<Book> searchBooks(@Param("q") String query);
}
