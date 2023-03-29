import React from "react";
import {Container, Button, Tab, Row, Col, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

function CatalogueNavbar(props){
    const data = props.data

    const catalogueNavbarStyle = {width: "300px", height: `${(data.length) * 50}px`, backgroundColor:"white", borderRadius:"14px",
                                  boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)"}
    const headerStyle = {textAlign:"center", fontWeight:"bold", padding: "10px"}

    const items = data.map((data) =>{
        return <ListGroup.Item action href={"#" + data.category} key={data.id}>{data.category}</ListGroup.Item>
    })


    return (
    <Container fluid style={catalogueNavbarStyle}>
        <h1 style = {headerStyle}>Katalog</h1>
        <ListGroup>
            {items}
        </ListGroup>
    </Container>
    )
}

function BookCard(props){
    const bookCardStyle = {backgroundColor: "white", width:"200px", height:"350px", padding:"10px",
                           borderRadius:"12px",boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)"}

    const book = props.data

    return(
        <Container fluid className="d-flex flex-column bd-highlight mb-3" style={bookCardStyle}>
            {book.imageLinks && <img src={book.imageLinks.thumbnail}></img>}
            {book.title && <h1 style={{fontWeight:"bold", fontSize:"15px"}}>{book.title}</h1>}
            {book.authors && <h1 style={{fontSize:"12px"}}>{`${book.authors[0]}`}</h1>}
        </Container>
    )
}

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
            <Container fluid className="d-flex flex-wrap" style={{padding:"15px"}}>
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

    return(
        <Container fluid className="d-flex justify-content-start" style={mainStyle}>
            <CatalogueNavbar data={data}/>
            <Container className="d-flex flex-column">
                <RandomBookPanel category="Horrors"/>
                <RandomBookPanel category="Fantasy"/>
            </Container>
        </Container>
    )
}