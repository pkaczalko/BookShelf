import React from "react";
import {Carousel, Container, Button, Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import CategoryTitle from "./CategoryTitle";
import CardsSectionDisplay from "./CardsSectionDisplay";
import ButtonRight from "./ButtonRight";
import ButtonLeft from "./ButtonLeft";


export default function CategoryCards(props){
    const carouselStyle = {width:"1280px", height:"130%"};

    const carouselRef = React.useRef(null);
    const [activeIndex, setActiveIndex] = React.useState(0);

    const handleSelect = (selectedIndex) =>{
        setActiveIndex(selectedIndex)
    }

    const handleNext = () => {
        console.log(carouselRef)
        carouselRef.current.next();
    }
    const handlePrev = () =>{
        carouselRef.current.prev();
    }

    const items = props.isbn;
    const ItemList = items.map((isbn)=>{
        return(
            <Carousel.Item>
                <CardsSectionDisplay isbn = {isbn.name}/>
            </Carousel.Item>
        )
    })

    return(
        <Container style={{position:"relative"}}>
            <CategoryTitle name={props.name} />
            <Carousel variant="dark" interval={null} ref={carouselRef} style={carouselStyle} onSelect={handleSelect}
                      indicators={false} prevIcon={null} nextIcon={null}>
                {ItemList}
            </Carousel>
            {activeIndex < ItemList.length - 1 && <ButtonRight handleNext = {handleNext}/>}
            {activeIndex > 0 && (<ButtonLeft handleNext = {handlePrev}/>)}
        </Container>
    )
}