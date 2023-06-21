import React, { useState } from "react";
import {Nav, Button} from 'react-bootstrap'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';


export default function RightNavbar(){
    const [showAddBookModal, setShowAddBookModal] = useState(false);


    return (
        <div className="d-flex">
            
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/borrowed">Wypożyczone</Nav.Link>
                <Nav.Link as={Link} to="/wishlist">Lista życzeń</Nav.Link>
                <Nav.Link as={Link} to="/logout">Wyloguj</Nav.Link>
            </Nav>
        </div>
    )
}
