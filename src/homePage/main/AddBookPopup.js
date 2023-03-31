import React, { useState } from "react";
import {Form, Container, Modal, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

export default function AddBookPopup(props){
    return(
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Dodawanie Książki</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="978-3-16-148410-0"
                            autoFocus/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>Zamknij</Button>
                <Button variant="primary" onClick={props.handleClose}>Zapisz</Button>
            </Modal.Footer>
        </Modal>
    )
}