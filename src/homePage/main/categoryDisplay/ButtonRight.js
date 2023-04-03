import React from "react";
import {Button, Image} from 'react-bootstrap'
import scrollRightIcon from "../../../assets/arrow_right.png"

export default function ButtonRight(props){
    const [hover, setHover] = React.useState({opacity:"0.3", boxShadow:"none", transform:"translateY(-50%) translateX(0px)"});
    const nextButtonStyle = {position: "absolute", top: "55%", right: "0", transform: hover.transform,
                             marginRight:"8.5px", opacity:hover.opacity, boxShadow:hover.boxShadow, 
                             transition: "transform 0.2s ease-in-out"}

    function handleMouseOver(){
        setHover({...hover, opacity: "0.7", boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
                  transform: "translateY(-50%) translateX(-4px)"})
    }

    function handleMouseOut(){
        setHover({...hover, opacity:"0.3", boxShadow: "none", transform: "translateY(-50%) translateX(0px)"})
    }

    return(
        <Button variant="light" onClick={props.handleNext} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} 
                style={nextButtonStyle} className="next-button-slider">
            <Image src={scrollRightIcon} style={{width:"50px"}}/>
        </Button>   
    )
}