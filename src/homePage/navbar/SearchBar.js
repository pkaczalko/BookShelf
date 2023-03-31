import React from "react";
import {Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

export default function SearchBar(){
    const [hover, setHover] = React.useState({borderWidth: "0px", boxShadow: "none"})

    const searchBarStyle = {width: "450px", borderWidth: hover.borderWidth, boxShadow:hover.boxShadow}

    const handleMouseClick = () =>{
        setHover({borderWidth: "0px", boxShadow: "none"})
    }
    
    return (
        <div>
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    style={searchBarStyle}
                    onFocus={handleMouseClick}
                />
            <Button variant="outline-light">Search</Button>
            </Form>
        </div>
    )
}