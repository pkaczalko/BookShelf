import React from "react";
import {Button, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import addIcon from "../../assets/add-icon.png"

export default function AddBookButton(props){
    const [hover, setHover] = React.useState({backgroundColor: "white", cursor: "none"})
    let containerStyle = {backgroundColor: hover.backgroundColor, width: "200px", height:"auto", padding:"6px",
                            borderRadius: "12px", boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)", cursor: hover.cursor}
    const addIconStyle = {width: "20%", userDrag: "none", userSelect: "none"}
    const textStyle = {fontSize:"15px", fontWeight:"bold", margin:"auto", userSelect: "none"}
    const handleMouseEnter = () =>{
        setHover({backgroundColor: "#B8B8B8", cursor: "pointer"})
    }

    const handleMouseLeave = () =>{
        setHover({backgroundColor: "white", cursor: "none"})
    }

    return (
        <div>
            <Container style={containerStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="d-flex justify-content-between" onClick={props.onClick}>
                <img src={addIcon} style={addIconStyle}></img>
                <h1 style={textStyle}>Dodaj Książkę</h1>
            </Container>
        </div>
    )
}