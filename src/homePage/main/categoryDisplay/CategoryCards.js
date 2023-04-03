import React from "react";
import {Carousel, Container, Button, Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import CategoryTitle from "./CategoryTitle";
import CardsSectionDisplay from "./CardsSectionDisplay";
import ButtonRight from "./ButtonRight";

export default function CategoryCards(props){
    const carouselStyle = {width:"1280px"};

    const carouselRef = React.useRef(null);
    const handleNext = () => {
        carouselRef.current.next();
    }

    return(
        <Container style={{position:"relative"}}>
            <CategoryTitle name={props.name} />
            <Carousel variant="dark" interval={null} ref={carouselRef} style={carouselStyle}>
                <Carousel.Item >
                    <CardsSectionDisplay /> 
                </Carousel.Item>
                <Carousel.Item>
                    <CardsSectionDisplay /> 
                </Carousel.Item>
            </Carousel>
            <ButtonRight handleNext = {handleNext}/>
        </Container>
    )
}