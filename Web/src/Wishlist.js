import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

function Wishlist() {
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editWishList, setEditWishList] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchWishlistBooks();
  }, []);

  const fetchWishlistBooks = async () => {
    try {
      const response = await axios.get("https://bookshelf-java.azurewebsites.net/books?q");
      const filteredBooks = response.data.filter(book => book.wishList);
      setWishlistBooks(filteredBooks);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleWishlist = async (book) => {
    try {
      const updatedBook = {
        ...book,
        authors: book.authors.map(author => ({ name: author })),
        categories: book.categories.map(category => ({ name: category })),
        wishList: !book.wishList // Invert the value of wishList
      };

      await axios.put(`https://bookshelf-java.azurewebsites.net/books?id=${book.id}`, updatedBook);
      fetchWishlistBooks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="book-list">
      {wishlistBooks.map((book) => (
        <div key={book.id} className="book">
          <h3>{book.title}</h3>
          <input
            type="checkbox"
            checked={book.wishList} // Use wishList for checked value
            onChange={() => toggleWishlist(book)}
          />
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
