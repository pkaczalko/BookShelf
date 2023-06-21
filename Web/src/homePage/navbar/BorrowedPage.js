import React, { useState, useEffect } from "react";
import { Nav, Button, Modal, Form } from 'react-bootstrap';
import './BorrowedPage.css';

import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

export default function BorrowedPage() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editBorrower, setEditBorrower] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    try {
      const response = await axios.get("https://bookshelf-java.azurewebsites.net/books?q");
      setBorrowedBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditBorrower = (book) => {
    setSelectedBook(book);
    setEditBorrower(book.borrower);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setEditBorrower("");
    setShowModal(false);
  };

  const saveBorrower = async () => {
    try {
      const updatedBooks = borrowedBooks.map((book) => {
        if (book.id === selectedBook.id) {
          return {
            ...book,
            borrower: editBorrower,
          };
        }
        return book;
      });

      const updatedBook = {
        id: selectedBook.id,
        title: selectedBook.title,
        isbn: selectedBook.isbn,
        imgURI: selectedBook.imgURI,
        isRead: selectedBook.isRead,
        favorite: selectedBook.favorite,
        borrower: editBorrower,
        wishList: selectedBook.wishList,
        publisher: selectedBook.publisher,
        coverType: selectedBook.coverType,
        volume: selectedBook.volume,
        rating: selectedBook.rating,
        publishedDate: selectedBook.publishedDate,
        description: selectedBook.description,
        language: selectedBook.language,
        pageCount: selectedBook.pageCount,
        currentPage: selectedBook.currentPage,
        shelf: selectedBook.shelf,
        categories: selectedBook.categories.map(category => ({ name: category })),
        authors: selectedBook.authors.map(author => ({ name: author })),
      };

      await axios.put(`https://bookshelf-java.azurewebsites.net/books?id=${selectedBook.id}`, updatedBook);

      setBorrowedBooks(updatedBooks);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const nonNullBorrowedBooks = borrowedBooks.filter(book => book.borrower !== null && book.borrower !== "");

  return (
    <div className="book-list">
      {nonNullBorrowedBooks.map((book) => (
        <div key={book.id} className="book" onClick={() => handleEditBorrower(book)}>
          <h3>{book.title}</h3>
          <p>{book.borrower}</p>
        </div>
      ))}

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Borrower</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Borrower Name</Form.Label>
            <Form.Control
              type="text"
              value={editBorrower}
              onChange={(e) => setEditBorrower(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveBorrower}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
