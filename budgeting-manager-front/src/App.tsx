import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './App.css';

//Components
import Home from './Components/Pages/Home/Home.tsx';

function App() {
  const navigate = useNavigate();

  /*
    Objective: Checks wether a token exists already
  */
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if(token) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [navigate])
  return (
    <div className="App">
      
    </div>
  );
}

export default App;