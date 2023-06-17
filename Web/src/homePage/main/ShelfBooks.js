import React, { useEffect, useState } from "react";
import { Carousel, Container, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import CatalogueNavbar from "./CatalogueNavbar";
import { BookList } from "./BookList";
import { BookListShelve } from "./BookListShelve";
export default ShelfBooks;


export function ShelfBooks() {
  const mainStyle = { padding: "20px 20px 20px 20px" };
  const [data, setData] = useState([]);
    let {nazwaPolki}=useParams()
    console.log(nazwaPolki)
  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('https://bookshelf-java.azurewebsites.net/shelves');
        const apiData = await response.json();

        // Update the data array with API data
        setData(apiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    console.log(nazwaPolki)
    fetchData();
  }, []);

  return (
    <Container fluid className="d-flex justify-content-start" style={mainStyle}>
      <CatalogueNavbar data={data} />
      <Container className="d-flex flex-column" style={{ marginLeft: "-12px" }}>
       <BookListShelve/>
      </Container>
    </Container>
  );
}
