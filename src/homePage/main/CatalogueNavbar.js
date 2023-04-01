import React from "react";
import {Container, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

export default function CatalogueNavbar(props){
    const data = props.data

    const catalogueNavbarStyle = {minWidth: "200px", width: "300px", height: `${(data.length) * 42 + 100}px`, backgroundColor:"white", borderRadius:"14px",
                                  boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)"}
    const headerStyle = {textAlign:"center", fontWeight:"bold", padding: "10px"}

    const items = data.map((data) =>{
        return <ListGroup.Item action href={"#" + data.category} variant="secondary" key={data.id} style={{height: "42px"}}>{data.category}</ListGroup.Item>
    })

    return (
    <Container fluid style={catalogueNavbarStyle}>
        <h1 style = {headerStyle}>Katalog</h1>
        <ListGroup>
            {items}
        </ListGroup>
    </Container>
    )
}