import React from "react";
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./homePage/main/Main";
import { MyNavbar } from "./homePage/navbar/Navbar";
import "./main.scss";

document.body.style.background = "#E8E8E8"
document.body.style.overflowX = "hidden";

function HomePage(){
    return (
        <BrowserRouter>
            <div>
                <MyNavbar />
                <Routes>
                    <Route exact path="/" element={<Main />}/>
                    <Route path="/borrowed" element={<h1>Borrowed</h1>}/>
                    <Route path="/myacc" element={<h1>My Account</h1>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
};


const root = createRoot(document.getElementById('root'));
root.render(<HomePage />);