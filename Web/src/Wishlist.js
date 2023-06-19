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
      
      console.log(response)
        console.log(JSON.stringify(filteredBooks))
      setWishlistBooks(filteredBooks);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditWishlist = (book) => {
    setSelectedBook(book);
    setEditWishList(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setEditWishList(false);
    setShowModal(false);
  };

  const saveWishlist = async () => {
    try {
      const updatedBooks = wishlistBooks.map((book) => {
        if (book.id === selectedBook.id) {
          return {
            ...book,
            wishlist: editWishList,
          };
        }
        return book;
      });

      

      setWishlistBooks(updatedBooks);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="book-list">
      {wishlistBooks.map((book) => (
        <div key={book.id} className="book" >
          <h3>{book.title}</h3>
          <input type="checkbox" checked={book.wishList} onChange={async(e)=>{
            await axios.put(`https://bookshelf-java.azurewebsites.net/books?id=${book.id}`, {
                ...book,
                wishlist: e.target.checked,
              });
            fetchWishlistBooks();
          }}/>
          <p>Wishlist: {book.wishList ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
