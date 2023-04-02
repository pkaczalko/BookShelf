import React from "react";
import {Carousel, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import AddBookPopup from "../addBook/AddBookPopup";
import AddBookCard from "../addBook/AddBookCard";
import CategoryTitle from "./CategoryTitle";
import BookCard from "./BookCard";
import CardsSectionDisplay from "./CardsSectionDisplay";

export default function CategoryCards(props){

    return(
        <Container>
            <CategoryTitle name={props.name} />
            <Carousel variant="dark">
                <Carousel.Item >
                    <CardsSectionDisplay /> 
                </Carousel.Item>
                <Carousel.Item>
                    <CardsSectionDisplay /> 
                </Carousel.Item>
            </Carousel>
        </Container>
    )
}