import React from "react";
import {Navbar, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

export function MyNavbar(){
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            </Container>
        </Navbar>
    )
}
