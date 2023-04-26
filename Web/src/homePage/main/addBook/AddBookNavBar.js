import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

export default function AddBookModal({ show, handleClose }) {
    const [shelves, setShelves] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        publisher: '',
        publishingDate: '',
        volume: '',
        coverType: 'Hardcover',
        isFavorite: false,
        isRead: false,
        isWishlist: false,
        shelfIds: [],
    });

    useEffect(() => {
        axios.get('http://localhost:8081/shelves')
            .then(response => {
                setShelves(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8081/authors')
            .then(response => {
                setAuthors(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setFormData({ ...formData, [name]: value });
    }

    const handleShelfChange = (event) => {
        const options = event.target.options;
        const selectedShelfIds = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedShelfIds.push(parseInt(options[i].value));
            }
        }

        setFormData({ ...formData, shelfIds: selectedShelfIds });
    }

    const handleSave = (event) => {
        event.preventDefault();
      
        const formDataWithAuthors = { ...formData, authors: authors.map(author => author.id) };
      
        axios.post('http://localhost:8081/books', formDataWithAuthors)
          .then(response => {
            console.log(response.data);
            handleClose();
          })
          .catch(error => {
            console.log(error);
          });
      }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="authors" className="form-label">Authors</label>
                    <select multiple className="form-control" id="authors" name="authors" onChange={handleInputChange}>
                        {authors.map(author => (
                        <option key={author.id} value={author.id}>{author.name}</option>
                        ))}
                    </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="isbn" className="form-label">ISBN</label>
                        <input type="text" className="form-control" id="isbn" name="isbn" onChange={handleInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="publisher" className="form-label">Publisher</label>
                        <input type="text" className="form-control" id="publisher" name="publisher" onChange={handleInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="publishing-date" className="form-label">Publishing Date</label>
                        <input type="date" className="form-control" id="publishing-date" name="publishing-date" onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="volume" className="form-label">Volume</label>
                        <input type="number" className="form-control" id="volume" name="vloume" onChange={handleInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cover-type" className="form-label">Cover Type</label>
                        <select className="form-control" id="cover-type" name="cover-type" onChange={handleInputChange}>
                            <option>Hardcover</option>
                            <option>Light cover</option>
                        </select>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="favorite" name="favorite" onChange={handleInputChange}/>
                        <label className="form-check-label" htmlFor="favorite">Favorite</label>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="is-read" name="is-read" onChange={handleInputChange}/>
                        <label className="form-check-label" htmlFor="is-read">Is Read</label>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="wishlist" name="wishlist" onChange={handleInputChange}/>
                        <label className="form-check-label" htmlFor="wishlist">Wishlist</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="shelf" className="form-label">Shelf</label>
                        <select multiple className="form-control" id="shelf" >
                            {shelves.map(shelf => (
                                <option key={shelf.id}>{shelf.name}</option>
                            ))}
                        </select>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}
