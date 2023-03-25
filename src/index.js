import React from "react";
import {createRoot} from 'react-dom/client';
import "./main.scss"

function HomePage(){
    return (
        <div>
            <h1>BookShelf HomePage</h1>
            <p>Helo</p>
        </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<HomePage />);