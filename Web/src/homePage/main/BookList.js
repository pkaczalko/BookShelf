import React, { useEffect, useState } from "react";
import { Container, Card, Modal, Button, Row, Col } from 'react-bootstrap';
import { EditBookForm } from './EditBookForm';
import StarRatingComp from 'react-star-rating-component';

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
    // Convert categories and authors to arrays if they are not already
    const categories = Array.isArray(editedBook.categories) ? editedBook.categories : [editedBook.categories];
    const authors = Array.isArray(editedBook.authors) ? editedBook.authors : [editedBook.authors];
  
    // Update the editedBook object with the converted categories and authors
    const updatedBook = { ...editedBook, categories, authors };

    console.log("Zapisano edytowaną książkę:", updatedBook);
    setEditMode(false);
  };

  return (
    <Container className="grid-container" style={{ marginLeft: "-12px" }}>
      {books.map((book, index) => (
        // Render two books per row
        index % 2 === 0 && (
          <Row key={book.id}>
            <Col xs={4} md={3} lg={2}>
              <Card.Img className="book-image" variant="top" src={book.imgURI || "https://books.google.pl/googlebooks/images/no_cover_thumb.gif"} alt="Book Cover" />
            </Col>
            <Col Col xs={8} md={9} lg={3}>
              <Card className="custom-card" onClick={() => handleBookClick(book)}>
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>
                    <strong>Publisher:</strong> {book.publisher}<br />
                    <strong>Categories:</strong> {book.categories.join(", ")}<br />
                    <strong>Authors:</strong> {book.authors.join(", ")}
                  </Card.Text>
                  <div>
                    <StarRatingComp value={book.rating} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            {books[index + 1] && (
              
              <Col xs={8} md={9} lg={3}>
                <Card className="custom-card" onClick={() => handleBookClick(books[index + 1])}>
                  <Card.Img className="book-image" variant="top" src={books[index + 1].imgURI || "https://books.google.pl/googlebooks/images/no_cover_thumb.gif"} alt="Book Cover" />
                  <Card.Body>
                    <Card.Title>{books[index + 1].title}</Card.Title>
                    <Card.Text>
                      <strong>Publisher:</strong> {books[index + 1].publisher}<br />
                      <strong>Categories:</strong> {books[index + 1].categories.join(", ")}<br />
                      <strong>Authors:</strong> {books[index + 1].authors.join(", ")}
                    </Card.Text>
                    <div>
                      <StarRatingComp value={books[index + 1].rating} />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        )
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
              <StarRatingComp value={selectedBook.rating} /><br />
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
