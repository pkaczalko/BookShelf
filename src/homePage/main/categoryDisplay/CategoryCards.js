import React from "react";
import {Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import AddBookPopup from "../addBook/AddBookPopup";
import AddBookCard from "../addBook/AddBookCard";
import CategoryTitle from "./CategoryTitle";
import BookCard from "./BookCard";

export default function CategoryCards(props){
    const categoryCardsStyle = {padding:"10px", marginLeft:"-12px"}
    const [showAddPopup, setShowAddPopup] = React.useState(false)
    const [books, setBooks] = React.useState([])

    const maxSize = 5
    const handleClose = () => setShowAddPopup(false)
    const handleShow = () => setShowAddPopup(true)

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
        <Container>
            <CategoryTitle name={props.name} />
            <Container style={categoryCardsStyle} className="d-flex justify-content-start">
                {BookCardList}
                <AddBookCard onHandleClick={handleShow} />
                <AddBookPopup show={showAddPopup} handleClose={handleClose}/>
            </Container>
        </Container>
    )
}