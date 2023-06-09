import React, { useEffect, useState } from "react";
import { Carousel, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import CatalogueNavbar from "./CatalogueNavbar";
import { BookList } from "./BookList";


export function Main() {
  const mainStyle = { padding: "20px 20px 20px 20px" };
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/categories');
        const apiData = await response.json();

        // Update the data array with API data
        setData(apiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid className="d-flex justify-content-start" style={mainStyle}>
      <CatalogueNavbar data={data} />
      <Container className="d-flex flex-column" style={{ marginLeft: "-12px" }}>
        <BookList />
      </Container>
    </Container>
  );
}
