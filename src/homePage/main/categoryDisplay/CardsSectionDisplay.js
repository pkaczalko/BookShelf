import React from "react";
import {Container} from 'react-bootstrap'
import AddBookPopup from "../addBook/AddBookPopup";
import AddBookCard from "../addBook/AddBookCard";
import BookCard from "./BookCard";

export default function CardsSectionDisplay(props){
    const categoryCardsStyle = {padding:"10px", marginLeft:"-12px"}
    const [showAddPopup, setShowAddPopup] = React.useState(false)

    const handleClose = () => setShowAddPopup(false)
    const handleShow = () => setShowAddPopup(true)

    const books = props.isbn
    const BookCardList = books.map((book) =>{
        return <BookCard data={book.info} key={book.id}/>
    })

    return(
        <Container style={categoryCardsStyle} className="d-flex justify-content-start">
            {BookCardList}
            {props.last && <AddBookCard onHandleClick={handleShow} />}
            {props.last && <AddBookPopup show={showAddPopup} handleClose={handleClose}/>}
        </Container>
    )
}