import React, { useState, useEffect } from "react";
import { Carousel, Container, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import CategoryTitle from "./CategoryTitle";
import CardsSectionDisplay from "./CardsSectionDisplay";
import ButtonRight from "./ButtonRight";
import ButtonLeft from "./ButtonLeft";
import Axios from "axios";

export default function CategoryCards(props) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8081/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <CategoryTitle title={books.title} />
      <Carousel>
        <Carousel.Item>
          <CardsSectionDisplay books={books} last={true} />
        </Carousel.Item>
      </Carousel>
      <ButtonRight/>
      <ButtonLeft />
    </Container>
  );
}
