import React from "react";
import {Carousel, Container, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import CatalogueNavbar from "./CatalogueNavbar";
import BookCard from "./categoryDisplay/BookCard";
import CategoryTitle from "./categoryDisplay/CategoryTitle";
import CategoryCards from "./categoryDisplay/CategoryCards";

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

    const isbn = "diune"

    return(
        <Container fluid className="d-flex justify-content-start" style={mainStyle}>
            <CatalogueNavbar data={data}/>
            <Container className="d-flex flex-column" style={{marginLeft: "-12px"}}>
                <CategoryCards name="Moje Książki" isbn={isbn}/>
            </Container>
        </Container>
    )
}