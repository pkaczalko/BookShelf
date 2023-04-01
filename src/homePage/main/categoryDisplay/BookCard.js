import React from "react";
import {Container, Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

export default function BookCard(props){
    const [hover, setHover] = React.useState({cursor: "none", transform: "translateY(0px)"})
    const cardStyle = {minWidth: "200px", height: "350px", width:"200px", margin:"7px", borderRadius:"14px",
                       cursor:hover.cursor, boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)", userSelect: "none",
                       marginTop: hover.marginTop, transform: hover.transform, transition:"transform 0.4s"}
    const addIconStyle = {maxHeight: "230px", minHeight:"230px", margin:"auto"}
    const titleStyle = {fontSize: "13px", fontWeight: "bold", whiteSpace:"nowrap", overflow:"hidden", textOverflow: "ellipsis"}
    const authorStyle = {fontSize: "14px", whiteSpace:"nowrap", overflow:"hidden", textOverflow: "ellipsis"}

    function handleMouseOver(){
        setHover({...hover, cursor: "pointer", transform: "translateY(-12px)"})
    }

    function handleMouseOut(){
        setHover({...hover, cursor: "none", transform: "translateY(0px)"})
    }

    return(
        <Card onClick={props.onHandleClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={cardStyle} 
              bg={hover.bg} key="dark" text={hover.text}>
            <Card.Header style={{display:"flex"}}>
                {props.data.imageLinks && <Card.Img variant="top" src={props.data.imageLinks.thumbnail} style={addIconStyle}/>}
            </Card.Header>
            <Card.Body>
                {props.data.title && <Card.Title style={titleStyle}>{props.data.title}</Card.Title>}
            </Card.Body>
            <Card.Footer style={{height:"40px"}} >
                {props.data.authors && <Card.Title style={authorStyle}>{props.data.authors[0]}</Card.Title>}
            </Card.Footer>
        </Card>
    )
}