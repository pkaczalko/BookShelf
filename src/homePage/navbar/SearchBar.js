import React from "react";
import {Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

export default function SearchBar(){
    return (
        <div>
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    style={{width: "450px"}}
                />
            <Button variant="outline-light">Search</Button>
            </Form>
        </div>
    )
}