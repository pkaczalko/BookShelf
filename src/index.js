import React from "react";
import {createRoot} from 'react-dom/client';
import { Main } from "./homePage/Catalogue";
import { MyNavbar } from "./homePage/Navbar";

document.body.style.background = "#E8E8E8"

function HomePage(){
    return (
        <div>
            <MyNavbar />
            <Main />
        </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<HomePage />);