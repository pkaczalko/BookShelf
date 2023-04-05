import React from "react";
import {Carousel, Container, Button, Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import CategoryTitle from "./CategoryTitle";
import CardsSectionDisplay from "./CardsSectionDisplay";
import ButtonRight from "./ButtonRight";
import ButtonLeft from "./ButtonLeft";


export default function CategoryCards(props){
    const carouselStyle = {width:"1280px"};

    const carouselRef = React.useRef(null);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [books, setBooks] = React.useState([])

    const handleSelect = (selectedIndex) =>{
        setActiveIndex(selectedIndex)
    }

    const handleNext = () => {
        carouselRef.current.next();
    }
    const handlePrev = () =>{
        carouselRef.current.prev();
    }

    const maxSize = 6
    React.useEffect(() =>{
        fetch("https://www.googleapis.com/books/v1/volumes?q=" + props.isbn) //DO EWENTUALNEJ ZMIANY WYSZUKIWANIA PO API
        .then(res => res.json())
        .then((data) => {
            const volumeInfo = data.items.map((book) =>{
                return book.volumeInfo
            })

            let prevId = 0
            const volumeInfoIndexed = volumeInfo.map((book) =>{
                const currId = prevId + 1
                prevId = currId
                return {info: book, id: currId}
            })

            let volumeInfoList = []
            for (let i = 0; i < (volumeInfoIndexed.length/maxSize); i++){
                volumeInfoList.push([...(volumeInfoIndexed.slice(1*(i*maxSize),(i+1)*maxSize))])
            }
            
            setBooks(volumeInfoList)
        })
    },[])

    const ItemList = books.map((book, index, array)=>{
        return(
            <Carousel.Item key={index}>
                <CardsSectionDisplay isbn = {book} last = {index === array.length - 1}/>
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