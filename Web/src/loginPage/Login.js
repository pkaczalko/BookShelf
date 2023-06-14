import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Login.css';

export function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectToCatalog, setRedirectToCatalog] = useState(false);

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
          setRedirectToCatalog(true); // Set the flag to trigger redirection
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
    return <Navigate to="/katalog" />; // Redirect to /katalog
  }

  return (
    <div className="login-container">
      <div className="bookshelf-container">
        <h2>Bookshelf</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="login">Login:</label>
          <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  );
}
