import React, { useEffect, useState } from "react";
import { Container, Card, Modal, Button } from 'react-bootstrap';

export function BookList() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState({
    id: null,
    title: "",
    isbn: "",
    imgURI: "",
    isRead: false,
    favorite: false,
    borrower: "",
    wishList: false,
    publisher: "",
    coverType: "",
    volume: null,
    rating: 0,
    publishedDate: "",
    description: "",
    language: "",
    pageCount: 0,
    currentPage: 0,
    shelf: {
      id: null,
      name: ""
    },
    categories: [],
    authors: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/books?q=97');
        const apiData = await response.json();
        setBooks(apiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook({
      id: book.id,
      title: book.title,
      isbn: book.isbn,
      imgURI: book.imgURI,
      isRead: book.isRead,
      favorite: book.favorite,
      borrower: book.borrower,
      wishList: book.wishList,
      publisher: book.publisher,
      coverType: book.coverType,
      volume: book.volume,
      rating: book.rating,
      publishedDate: book.publishedDate,
      description: book.description,
      language: book.language,
      pageCount: book.pageCount,
      currentPage: book.currentPage,
      shelf: {
        id: book.shelf.id,
        name: book.shelf.name
      },
      categories: book.categories,
      authors: book.authors
    });
  };

  const handleCloseModal = () => {
    setSelectedBook({
      id: null,
      title: "",
      isbn: "",
      imgURI: "",
      isRead: false,
      favorite: false,
      borrower: "",
      wishList: false,
      publisher: "",
      coverType: "",
      volume: null,
      rating: 0,
      publishedDate: "",
      description: "",
      language: "",
      pageCount: 0,
      currentPage: 0,
      shelf: {
        id: null,
        name: ""
      },
      categories: [],
      authors: []
    });
  };

  const handleEditClick = () => {
    // Handle edit action here
    console.log("Edit button clicked");
  };

  return (
    <Container className="grid-container" style={{ marginLeft: "-12px" }}>
      {books.map((book) => (
        <Card key={book.id} className="custom-card" onClick={() => handleBookClick(book)}>
          <Card.Img variant="top" src={`/images/${book.imgURI}`} alt="Book Cover" />
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>
              <strong>Publisher:</strong> {book.publisher}<br />
              <strong>Categories:</strong> {book.categories.join(", ")}<br />
              <strong>Authors:</strong> {book.authors.join(", ")}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}

      {selectedBook.id && (
        <Modal show={!!selectedBook.id} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedBook.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong>ISBN:</strong> {selectedBook.isbn}<br />
            <strong>Publisher:</strong> {selectedBook.publisher}<br />
            <strong>Categories:</strong> {selectedBook.categories.join(", ")}<br />
            <strong>Authors:</strong> {selectedBook.authors.join(", ")}<br />
            <strong>Cover Type:</strong> {selectedBook.coverType}<br />
            <strong>Volume:</strong> {selectedBook.volume ? selectedBook.volume : "N/A"}<br />
            <strong>Rating:</strong> {selectedBook.rating}<br />
            <strong>Published Date:</strong> {selectedBook.publishedDate}<br />
            <strong>Description:</strong> {selectedBook.description}<br />
            <strong>Language:</strong> {selectedBook.language}<br />
            <strong>Page Count:</strong> {selectedBook.pageCount}<br />
            <strong>Current Page:</strong> {selectedBook.currentPage}<br />
            <strong>Shelf:</strong> {selectedBook.shelf.name}<br />
            <strong>Favorite:</strong> {selectedBook.favorite ? "Yes" : "No"}<br />
            <strong>Wish List:</strong> {selectedBook.wishList ? "Yes" : "No"}<br />
            <strong>Is Read:</strong> {selectedBook.isRead ? "Yes" : "No"}<br />
            <strong>Borrower:</strong> {selectedBook.borrower}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClick}>Edit</Button>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}
