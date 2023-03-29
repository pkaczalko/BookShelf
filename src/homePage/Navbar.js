import React from "react";
import {Navbar, Container, Form, Button, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

function SearchBar(){
    return (
        <div>
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    style={{width: "450px"}}
                />
            <Button variant="outline-light">Search</Button>
            </Form>
        </div>
    )
}

function RightNavbar(){
    return (
        <div>
            <Nav className="me-auto">
                <Nav.Link href="#action2">Posiadane</Nav.Link>
                <Nav.Link href="#action1">Moje Konto</Nav.Link>
            </Nav>
        </div>
    )
}

export function MyNavbar(){
    const brandStyle = {fontSize: "30px", fontWeight: "bold"}
    return (
        <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
            <Container fluid style={{padding: "0px 20px 0px 20px"}}>
                <Navbar.Brand href="#home" style={brandStyle}>BookShelf</Navbar.Brand>
                <SearchBar/>
                <RightNavbar/>
            </Container>
        </Navbar>
    )
}
