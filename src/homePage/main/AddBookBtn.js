import React from "react";
import {Button, Container, Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import addIcon from "../../assets/add-icon.png"

export default function AddBookButton(props){
    let containerStyle = {width: "200px", height:"auto", padding:"6px",
                            borderRadius: "12px", boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)"}
    const addIconStyle = {width: "20%", userDrag: "none", userSelect: "none"}
    const textStyle = {fontSize:"17px", fontWeight:"bold", margin:"auto", userSelect: "none"}

    return (
        <Button style={containerStyle} variant="light" className="d-inline-flex align-items-center">
          <Image roundedCircle src={addIcon} style={addIconStyle}/>
          <h1 style={textStyle}>Dodaj Książkę</h1>
        </Button>
    )
}