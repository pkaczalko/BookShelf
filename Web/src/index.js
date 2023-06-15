import React from "react";
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Main } from "./homePage/main/Main";
import { Login } from "./loginPage/Login";
import { MyNavbar } from "./homePage/navbar/Navbar";
import "./main.scss";
import BorrowedPage from "./homePage/navbar/BorrowedPage";
import { ShelfBooks } from "./homePage/main/shelfBooks";


document.body.style.background = "#E8E8E8"
document.body.style.overflowX = "hidden";

function HomePage(){
    return (
        <BrowserRouter>
            <div>
                <MyNavbar />
                <Routes>
                <Route exact path="/" >
                    <Route index element={<Login />}/>
                    <Route path="katalog" >
                        <Route index element={<Main />}/>
                        <Route path=":nazwaPolki" element={<ShelfBooks/>}/>

                    </Route>
                    <Route path="borrowed" element={<BorrowedPage />} />
                    <Route path="myacc" element={<h1>My Account</h1>} />
                   
                </Route>  
                <Route path="*" element={<Navigate to="" replace />} />
                   
                    
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