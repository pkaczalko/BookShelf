import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Logout() {
    const navigate = useNavigate();

    useEffect(()=>{

        
        document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
        navigate("/",{replace:true})
        

    },[])
    return ( null );
}

export default Logout;