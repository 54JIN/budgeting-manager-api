import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Header.css';

//Components


function Header({ activeVal }) {
  const navigate = useNavigate();

  /*
     Objective: On the event of an user clicking the logout button, request the server-side to log the user out, and if the server-side response has no errors, then remove all associated tokens from localStorage.
  */
  const handleLogoutClick = async () => {
    try {
      await axios.post('/api/users/logout', 
      {
          
      },
      {
          headers: {
              Authorization: `Bearer ${window.localStorage.getItem('token').replace('"', '').replace('"', '')}`
          }
      }).then(() => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('name')
        navigate('/login');
    })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="Header">
      <div className="Header-Logo">
          <h1>Budget</h1>
      </div>
      <div className='Header-Navigations'>
        <button className={activeVal === 0 ? 'Navigation-Active' : 'Navigation-Inactive'} >Dashboard</button>
        <button className={activeVal === 1 ? 'Navigation-Active' : 'Navigation-Inactive'} >Analysis</button>
        <button className={activeVal === 2 ? 'Navigation-Active' : 'Navigation-Inactive'} >Profile</button>
        <button className={activeVal === 3 ? 'Navigation-Active' : 'Navigation-Inactive'} >Settings</button>
      </div>
      <div className='Header-Logout'>
        <button onClick={handleLogoutClick} >Log out</button>
      </div>
      <div className='Header-Footer'>
        <p>userName</p>
      </div>
    </div>
  );
}

export default Header;