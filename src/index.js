import React from "react";
import {createRoot} from 'react-dom/client';
import { MyNavbar } from "./homePage/Navbar";

function HomePage(){
    return (
        <div>
            <MyNavbar />
        </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<HomePage />);