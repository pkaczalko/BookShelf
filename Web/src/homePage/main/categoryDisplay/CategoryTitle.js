import React from "react";
import {Button, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

export default function CategoryTitle(props){
    const [hover, setHover] = React.useState({backgroundColor: "#E8E8E8", borderWidth: "0px",
                                              boxShadow:"none", transform: "translateX(0px)", opacity:"0"})

    const textStyle = { color:"#00BFFF", width:hover.width, fontSize:"20px", fontWeight: "600", opacity:hover.opacity,
                        transform: hover.transform, transition: "opacity 1s, transform 1s", padding:"5px", marginTop:"6.5px"};

    const buttonStyle = {fontSize:"29px", width:hover.width, backgroundColor: hover.backgroundColor,
                         borderWidth: hover.borderWidth, boxShadow: hover.boxShadow,
                         whiteSpace: "nowrap"}


    function handleMouseEnter(){
      setHover({backgroundColor: "#E8E8E8", borderWidth:"0px", boxShadow:"none", opacity:"1", transform: "translateX(12px)"})
    }

    function handleMouseOut(){
      setHover({backgroundColor: "#E8E8E8", borderWidth:"0px", boxShadow:"none", opacity:"0", transform: "translateX(0px)"})
    }

    return(
      <Button onMouseOver={handleMouseEnter} onMouseOut={handleMouseOut} style={buttonStyle} variant="light" className="d-inline-flex align-items-center">
        <span style={{fontSize:"30px", fontWeight: "600"}}className="ms-1">{props.name}</span>
        <span style={textStyle} onMouseOver={handleMouseEnter} onMouseOut={handleMouseOut} className="ms-1">Przeglądaj Wszystko</span>
      </Button>
    )
}