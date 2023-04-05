import React from "react";
import {Card} from 'react-bootstrap'
import addIcon from "../../../assets/plus-5-512.png"
import 'bootstrap/dist/css/bootstrap.css';

export default function AddBookCard(props){
    const [hover, setHover] = React.useState({cursor: "none", transform: "translateY(0px)"})
    const cardStyle = {minWidth: "200px", height: "350px", width:"200px", margin:"7px", borderRadius:"14px",
                       cursor:hover.cursor, boxShadow: "0px 4px 6px 0px rgba(0,0,0,0.2)", userSelect: "none",
                       marginTop: hover.marginTop, transform: hover.transform, transition:"transform 0.4s"}
    const addIconStyle = {width:"100%", padding:"5px", marginTop:"37px"}

    function handleMouseOver(){
        setHover({...hover, cursor: "pointer", transform: "translateY(-10px)"})
    }

    function handleMouseOut(){
        setHover({...hover, cursor: "none", transform: "translateY(0px)"})
    }

    return(
        <Card onClick={props.onHandleClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={cardStyle} 
              bg={hover.bg} key={props.key} text={hover.text}>
            <Card.Header style={{height:"247px"}}>
                <Card.Img variant="top" src={addIcon} style={addIconStyle}/>
            </Card.Header>
            <Card.Body>
                <Card.Title>Dodaj Książkę</Card.Title>
            </Card.Body>
        </Card>
    )
}