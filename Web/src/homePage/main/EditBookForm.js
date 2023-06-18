import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import StarRatingComp from 'react-star-rating-component';// Importujemy komponent StarRating

export function EditBookForm({ book, onSave, onCancel }) {
  const [editedBook, setEditedBook] = useState({});
  const [rating, setRating] = useState(0); // Dodajemy stan rating

  useEffect(() => {
    setEditedBook(book);
    setRating(book.rating);
  console.log(JSON.stringify(book))
    const authorNames = Array.isArray(book.authors)
      ? book.authors.map((author) => author)
      : [];
  
    const categoryNames = Array.isArray(book.categories)
      ? book.categories.map((category) => category)
      : [];
  
    setEditedBook((prevBook) => ({
      ...prevBook,
      authors: authorNames,
      categories: categoryNames,
    }));
  }, [book]);
  
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let updatedValue = value;
  
    if (name === 'categories') {
      updatedValue = value.split(',').map((category) => category.trim());
    }
  
    if (name === 'authors') {
      updatedValue = value.split(',').map((author) => author.trim());
    }
  
    setEditedBook((prevBook) => ({
      ...prevBook,
      [name]: updatedValue,
    }));
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating); // Aktualizujemy stan rating po zmianie oceny
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const transformedAuthors = editedBook.authors.map((author) => ({ name: author }));
      const transformedCategories = editedBook.categories.map((category) => ({ name: category }));

      const updatedBook = {
        ...editedBook,
        rating: rating, // Ustawiamy zaktualizowaną ocenę
        authors: transformedAuthors,
        categories: transformedCategories,
      };

      const response = await axios.put(
        `https://bookshelf-java.azurewebsites.net/books?id=${editedBook.id}`,
        updatedBook
      );
      onSave(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <Modal.Body>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={editedBook.title || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>ISBN:</label>
          <input
            type="text"
            name="isbn"
            value={editedBook.isbn || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Publisher:</label>
          <input
            type="text"
            name="publisher"
            value={editedBook.publisher || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
        <label>Categories:</label>
        <input
            type="text"
            name="categories"
            value={editedBook.categories?.map((category) => {
              
              return category}).join(", ") || ""}
            onChange={handleInputChange}
        />
        </div>
        <div>
        <label>Authors:</label>
        <input
            type="text"
            name="authors"
            value={editedBook.authors?.map(author => author).join(", ") || ""}
            onChange={handleInputChange}
        />
        </div>
        <div>
          <label>Cover Type:</label>
          <input
            type="text"
            name="coverType"
            value={editedBook.coverType || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Volume:</label>
          <input
            type="text"
            name="volume"
            value={editedBook.volume || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <StarRatingComp value={rating} onStarClick={handleRatingChange} /> {/* Używamy zmienionego aliasu komponentu */}
        </div>
        <div>
          <label>Published Date:</label>
          <input
            type="text"
            name="publishedDate"
            value={editedBook.publishedDate || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={editedBook.description || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Language:</label>
          <input
            type="text"
            name="language"
            value={editedBook.language || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Page Count:</label>
          <input
            type="number"
            name="pageCount"
            value={editedBook.pageCount || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Current Page:</label>
          <input
            type="number"
            name="currentPage"
            value={editedBook.currentPage || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Borrower:</label>
          <input
            type="text"
            name="borrower"
            value={editedBook.borrower || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Image URI:</label>
          <input
            type="text"
            name="imgURI"
            value={editedBook.imgURI || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Is Read:</label>
          <input
            type="checkbox"
            name="isRead"
            checked={editedBook.isRead}
            onChange={() =>
              setEditedBook((prevBook) => ({
                ...prevBook,
                isRead: !prevBook.isRead,
              }))
            }
          />
        </div>
        <div>
          <label>Favorite:</label>
          <input
            type="checkbox"
            name="favorite"
            checked={editedBook.favorite}
            onChange={() =>
              setEditedBook((prevBook) => ({
                ...prevBook,
                favorite: !prevBook.favorite,
              }))
            }
          />
        </div>
        <div>
          <label>Wish List:</label>
          <input
            type="checkbox"
            name="wishList"
            checked={editedBook.wishList}
            onChange={() =>
              setEditedBook((prevBook) => ({
                ...prevBook,
                wishList: !prevBook.wishList,
              }))
            }
          />
        </div>
        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </Modal.Body>
  );
}
