import { Navigate } from 'react-router-dom';
import loginBackground from './login_tlo.png';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectToCatalog, setRedirectToCatalog] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{

    
    let x = document.cookie;
    console.log(x)
    x.split(";").forEach((cookie)=>{
      console.log(cookie)
      if(cookie.split("=")[0]=="login"){
        navigate("katalog")
      }

    })
   

},[])

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://bookshelf-java.azurewebsites.net/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(users => {
        const user = users.find(u => u.login === login && u.password === password);
        if (user) {
          console.log('Login successful!');
          document.cookie = `login=${login}; path=/`;
          setRedirectToCatalog(true);
        } else {
          console.log('Incorrect login or password.');
          setErrorMessage('Incorrect login or password.');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (redirectToCatalog) {
    return <Navigate to="/katalog" />;
  }

  return (
    <div style={{ backgroundImage: `url(${loginBackground})` }} className="login-container">
      <div className="bookshelf-container">
        <h2>Bookshelf</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="login">Login:</label>
          <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  );
}
