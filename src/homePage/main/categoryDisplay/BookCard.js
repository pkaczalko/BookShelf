import React from "react";
import {Container, Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

export default function BookCard(props){
    const bookCardStyle = {width:"200px", height:"auto", padding:"10px",
                           borderRadius:"12px", boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)"}

    const book = props.
    
    return(
        <Card border="dark" bg="light" key="dark" text="dark" style={bookCardStyle}>
            {book.imageLinks && <Card.Img src={book.imageLinks.thumbnail}/>}
            <Card.Body>
                {book.title && <Card.Title>{book.title}</Card.Title>}
                {book.authors && <Card.Text>{`${book.authors[0]}`}</Card.Text>}
            </Card.Body>
        </Card>
    )
}