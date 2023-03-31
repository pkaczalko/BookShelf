import React from "react";
import {Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

export default function RightNavbar(){
    return (
        <div>
            <Nav className="me-auto">
                <Nav.Link href="#action2">Wypożyczone</Nav.Link>
                <Nav.Link href="#action1">Moje Konto</Nav.Link>
            </Nav>
        </div>
    )
}