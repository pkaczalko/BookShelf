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
  const [editedBook, setEditedBook] = useState(selectedBook);
  const [isEditing, setIsEditing] = useState(false);

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
    setSelectedBook(book);
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
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedBook(selectedBook);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`http://localhost:8081/books?isbn=${editedBook.isbn}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedBook),
      });

      if (response.ok) {
        // Zapisano pomyślnie
        // Tutaj możesz wykonać odpowiednie czynności po zapisaniu
      } else {
        console.error('Błąd podczas zapisywania danych');
      }
    } catch (error) {
      console.error('Błąd podczas zapisywania danych:', error);
    }

    setIsEditing(false);
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
            {isEditing ? (
              <>
                <strong>ISBN:</strong> <input type="text" name="isbn" value={editedBook.isbn} onChange={handleInputChange} /><br />
                <strong>Publisher:</strong> <input type="text" name="publisher" value={editedBook.publisher} onChange={handleInputChange} /><br />
                <strong>Cover Type:</strong> <input type="text" name="coverType" value={editedBook.coverType} onChange={handleInputChange} /><br />
                <strong>Volume:</strong> <input type="text" name="volume" value={editedBook.volume || ""} onChange={handleInputChange} /><br />
                <strong>Rating:</strong> <input type="number" name="rating" value={editedBook.rating} onChange={handleInputChange} /><br />
                <strong>Published Date:</strong> <input type="text" name="publishedDate" value={editedBook.publishedDate} onChange={handleInputChange} /><br />
                <strong>Description:</strong> <textarea name="description" value={editedBook.description} onChange={handleInputChange} /><br />
                <strong>Language:</strong> <input type="text" name="language" value={editedBook.language} onChange={handleInputChange} /><br />
                <strong>Page Count:</strong> <input type="number" name="pageCount" value={editedBook.pageCount} onChange={handleInputChange} /><br />
                <strong>Current Page:</strong> <input type="number" name="currentPage" value={editedBook.currentPage} onChange={handleInputChange} /><br />
                <strong>Shelf:</strong> <input type="text" name="shelfName" value={editedBook.shelf.name} onChange={handleInputChange} /><br />
                <strong>Favorite:</strong> <input type="checkbox" name="favorite" checked={editedBook.favorite} onChange={handleInputChange} /><br />
                <strong>Wish List:</strong> <input type="checkbox" name="wishList" checked={editedBook.wishList} onChange={handleInputChange} /><br />
                <strong>Is Read:</strong> <input type="checkbox" name="isRead" checked={editedBook.isRead} onChange={handleInputChange} /><br />
                <strong>Borrower:</strong> <input type="text" name="borrower" value={editedBook.borrower} onChange={handleInputChange} /><br />
                {/* Dodaj pozostałe pola do edycji */}
              </>
            ) : (
              <>
                <strong>ISBN:</strong> {selectedBook.isbn}<br />
                <strong>Publisher:</strong> {selectedBook.publisher}<br />
                <strong>Cover Type:</strong> {selectedBook.coverType}<br />
                <strong>Volume:</strong> {selectedBook.volume || "N/A"}<br />
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
                <strong>Borrower:</strong> {selectedBook.borrower}<br />
                {/* Wyświetl pozostałe pola */}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {isEditing ? (
              <>
                <Button variant="primary" onClick={handleSaveClick}>Save</Button>
                <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
              </>
            ) : (
              <Button variant="secondary" onClick={handleEditClick}>Edit</Button>
            )}
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}
