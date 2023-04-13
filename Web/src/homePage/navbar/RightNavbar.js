import React from "react";
import {Nav} from 'react-bootstrap'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

export default function RightNavbar(){
    return (
        <div>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/borrowed">Wypożyczone</Nav.Link>
                <Nav.Link as={Link} to="/myacc">Moje Konto</Nav.Link>
            </Nav>
        </div>
    )
}