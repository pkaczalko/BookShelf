import React, { useEffect, useState } from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";

function PrivateRoute(props) {
    const navigate = useNavigate();
    
    let x = document.cookie;
    console.log(x)
    x.split(";").forEach((cookie)=>{
      console.log(cookie)
      if(cookie.split("=")[0]!=="login"){
        return <Navigate to="/" replace/> 
      }


    })
   return <Outlet/>
}

export default PrivateRoute;