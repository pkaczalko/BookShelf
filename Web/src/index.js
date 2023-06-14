import React from "react";
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./homePage/main/Main";
import { Login } from "./loginPage/Login";
import { MyNavbar } from "./homePage/navbar/Navbar";
import "./main.scss";
import BorrowedPage from "./homePage/navbar/BorrowedPage";


document.body.style.background = "#E8E8E8"
document.body.style.overflowX = "hidden";

function HomePage(){
    return (
        <BrowserRouter>
            <div>
                <MyNavbar />
                <Routes>
                <Route exact path="/" element={<Login />} />  
                    <Route exact path="/katalog" element={<Main />} />
                    <Route path="/borrowed" element={<BorrowedPage />} />
                    <Route path="/myacc" element={<h1>My Account</h1>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

function Navbar() {
    const location = useLocation();
  
    if (location.pathname === "/") {
      return null; // Hide the Navbar on the login page
    }
  
    return <MyNavbar />;
  }

  
  const root = createRoot(document.getElementById("root"));
  root.render(<HomePage />);