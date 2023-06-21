import React from "react";
import {Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";

export default function SearchBar(){
    const [hover, setHover] = React.useState({borderWidth: "0px", boxShadow: "none"})
    let navigate = useNavigate();
    const searchBarStyle = {width: "450px", borderWidth: hover.borderWidth, boxShadow:hover.boxShadow}

    const handleMouseClick = () =>{
        setHover({borderWidth: "0px", boxShadow: "none"})
    }
    
    const handleChange = (e) =>{
        navigate(`#${e.target.value}`)
    }

    return (
        <div>
            <Form className="d-flex">
                <input 
                    type="text"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    style={searchBarStyle}
                    onFocus={handleMouseClick}
                    onChange={handleChange}
                />
            
            </Form>
        </div>
    )
}