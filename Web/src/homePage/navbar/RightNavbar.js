import React, { useState } from "react";
import {Nav, Button} from 'react-bootstrap'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AddBookModal from "../main/addBook/AddBookNavBar";

export default function RightNavbar(){
    const [showAddBookModal, setShowAddBookModal] = useState(false);

    const handleCloseAddBookModal = () => setShowAddBookModal(false);
    const handleShowAddBookModal = () => setShowAddBookModal(true);

    return (
        <div className="d-flex">
            <div className="mr-auto">
                <Button variant="primary" onClick={handleShowAddBookModal}>Add Book</Button>
                <AddBookModal show={showAddBookModal} handleClose={handleCloseAddBookModal} />
            </div>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/borrowed">Wypożyczone</Nav.Link>
                <Nav.Link as={Link} to="/myacc">Moje Konto</Nav.Link>
            </Nav>
        </div>
    )
}
