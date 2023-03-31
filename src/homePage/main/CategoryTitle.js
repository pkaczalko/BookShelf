import React from "react";
import {Button, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

export default function CategoryTitle(props){
    const [hover, setHover] = React.useState({backgroundColor: "#E8E8E8", borderWidth: "0px",
                                              boxShadow:"none", width:"200px", opacity:"0"})

    const textStyle = { color:"#00BFFF", width:hover.width, fontSize:"20px", fontWeight: "600", opacity:hover.opacity,
                        transition: "width 1s, opacity 1s,transform 1s", padding:"5px", marginTop:"7px"};

    const buttonStyle = {fontSize:"29px", width:hover.width, backgroundColor: hover.backgroundColor,
                         borderWidth: hover.borderWidth, boxShadow: hover.boxShadow,
                         transition: "width 1s, opacity 1s, transform .30s", whiteSpace: "nowrap"}


    function handleMouseEnter(){
      setHover({backgroundColor: "#E8E8E8", borderWidth:"0px", boxShadow:"none", width:"440px", opacity:"1"})
    }

    function handleMouseOut(){
      setHover({backgroundColor: "#E8E8E8", borderWidth:"0px", boxShadow:"none", width:"200px", opacity:"0"})
    }

    return(
      <Button onMouseOver={handleMouseEnter} onMouseOut={handleMouseOut} style={buttonStyle} variant="light" className="d-inline-flex align-items-center">
        <span style={{fontSize:"30px", fontWeight: "600"}}className="ms-1">{props.name}</span>
        <span style={textStyle} onMouseOver={handleMouseEnter} onMouseOut={handleMouseOut} className="ms-1">Przeglądaj Wszystko</span>
      </Button>
    )
}