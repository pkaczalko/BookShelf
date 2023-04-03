import React from "react";
import {Container} from 'react-bootstrap'
import AddBookPopup from "../addBook/AddBookPopup";
import AddBookCard from "../addBook/AddBookCard";
import BookCard from "./BookCard";

export default function CardsSectionDisplay(){
    const categoryCardsStyle = {padding:"10px", marginLeft:"-12px"}
    const [showAddPopup, setShowAddPopup] = React.useState(false)
    const [books, setBooks] = React.useState([])

    const handleClose = () => setShowAddPopup(false)
    const handleShow = () => setShowAddPopup(true)

    const maxSize = 5

    React.useEffect(() =>{
        fetch("https://www.googleapis.com/books/v1/volumes?q=dune")
        .then(res => res.json())
        .then((data) => {
            const volumeInfo = data.items.map((book) =>{
                return book.volumeInfo
            })
            setBooks(volumeInfo.slice(0,maxSize))
        })
    },[])

    const BookCardList = books.map((book) =>{
        return <BookCard data={book} />
    })

    return(
        <Container style={categoryCardsStyle} className="d-flex justify-content-start">
            {BookCardList}
            <AddBookCard onHandleClick={handleShow} />
            <AddBookPopup show={showAddPopup} handleClose={handleClose}/>
        </Container>
    )
}