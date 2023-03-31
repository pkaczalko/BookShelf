import React from "react";
import {Card, Container, Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import AddBookPopup from "../addBook/AddBookPopup";
import AddBookCard from "../addBook/AddBookCard";
import CategoryTitle from "./CategoryTitle";

export default function CategoryCards(){
    const categoryCardsStyle = {padding:"10px"}
    const [showAddPopup, setShowAddPopup] = React.useState(false)

    const handleClose = () => setShowAddPopup(false)
    const handleShow = () => setShowAddPopup(true)

    return(
        <Container>
            <CategoryTitle name="Moje Książki" />
            <Container style={categoryCardsStyle} className="d-flex justify-content-start">
                <AddBookCard onHandleClick={handleShow} />
                <AddBookPopup show={showAddPopup} handleClose={handleClose}/>
            </Container>
        </Container>
    )
}