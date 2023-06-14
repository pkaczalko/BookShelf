import React, { useEffect, useState } from "react";
import { Container, Card, Modal, Button, Row, Col } from 'react-bootstrap';
import { EditBookForm } from './EditBookForm';

export function BookList() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://bookshelf-java.azurewebsites.net/books?q=');
        const apiData = await response.json();
        setBooks(apiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setEditMode(false);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleSaveEdit = (editedBook) => {
    console.log("Zapisano edytowaną książkę:", editedBook);
    setEditMode(false);
  };

  return (
    <Container className="grid-container" style={{ marginLeft: "-12px" }}>
      {books.map((book) => (
        <Card key={book.id} className="custom-card" onClick={() => handleBookClick(book)}>
          <Row>
            <Col xs={4} md={3} lg={2}>
              <Card.Img className="book-image" variant="top" src={book.imgURI || "https://books.google.pl/googlebooks/images/no_cover_thumb.gif"} alt="Book Cover" />
            </Col>
            <Col xs={8} md={9} lg={10}>
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  <strong>Publisher:</strong> {book.publisher}<br />
                  <strong>Categories:</strong> {book.categories.join(", ")}<br />
                  <strong>Authors:</strong> {book.authors.join(", ")}
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}

      {selectedBook && (
        <Modal show={!!selectedBook} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedBook.title}</Modal.Title>
          </Modal.Header>
          {editMode ? (
            <EditBookForm book={selectedBook} onSave={handleSaveEdit} onCancel={handleCancelEdit} />

          ) : (
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
              <strong>Shelf:</strong> {selectedBook.shelf ? selectedBook.shelf.name : "N/A"}<br />
              <strong>Favorite:</strong> {selectedBook.favorite ? "Yes" : "No"}<br />
              <strong>Wish List:</strong> {selectedBook.wishList ? "Yes" : "No"}<br />
              <strong>Is Read:</strong> {selectedBook.isRead ? "Yes" : "No"}<br />
              <strong>Borrower:</strong> {selectedBook.borrower}<br />
              <Button variant="secondary" onClick={handleEditClick}>Edit</Button>
            </Modal.Body>
          )}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}
