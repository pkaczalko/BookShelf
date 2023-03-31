import React from "react";
import {Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import CatalogueNavbar from "./CatalogueNavbar";
import BookCard from "./BookCard";
import AddBookButton from "./AddBookBtn";
import AddBookPopup from "./AddBookPopup";

function RandomBookPanel(props){
    const [books, setBooks] = React.useState([])

    const category = props.category

    React.useEffect(() =>{
        fetch("https://www.googleapis.com/books/v1/volumes?q=category:" + category)
        .then(res => res.json())
        .then((data) => {
            const volumeInfo = data.items.map((book) =>{
                return book.volumeInfo
            })
            setBooks(volumeInfo)
        })
    },[])

    const BookCardList = books.map((book) =>{
        return <BookCard data={book} />
    })

    return(
        <Container>
            <h1 style={{marginLeft:"40px"}}>{category}</h1>
            <Container fluid className="d-flex justify-content-between" style={{padding:"15px"}}>
                {BookCardList.slice(5)}
            </Container>
        </Container>
    )
}

export function Main(){
    const mainStyle = {padding: "20px 20px 20px 20px"}
    const data = [{category: "Horror", id:1},
                  {category: "Thriller", id:2},
                  {category: "Fantasy", id:3},
                  {category: "Sci-Fi", id:4},
                  {category: "Dokumentalne", id:5},
                  {category: "Biograficzne", id:6},
                  {category: "etc1", id:7},
                  {category: "etc2", id:8},
                  {category: "etc3", id:9},
                  {category: "etc4", id:10},
                  {category: "etc5", id:11},
                  {category: "etc6", id:12}]

    const [showAddPopup, setShowAddPopup] = React.useState(false)

    const handleClose = () => setShowAddPopup(false)
    const handleShow = () => setShowAddPopup(true)

    return(
        <Container fluid className="d-flex justify-content-start" style={mainStyle}>
            <CatalogueNavbar data={data}/>
            <Container className="d-flex flex-column">
                {/* <RandomBookPanel category="Horrors"/>
                <RandomBookPanel category="Fantasy"/> */}
                <AddBookButton onClick = {handleShow}/>
                <AddBookPopup show={showAddPopup} handleClose={handleClose}/>
            </Container>
        </Container>
    )
}