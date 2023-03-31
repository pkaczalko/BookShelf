import React from "react";
import {Navbar, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import SearchBar from "./SearchBar";
import RightNavbar from "./RightNavbar";

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
