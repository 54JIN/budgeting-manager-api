import React from 'react';

import './Header.css';

//Components


function Header() {
  return (
    <div className="Header">
      <div className="Header-Logo">
          <h1>Budget</h1>
      </div>
      <div className='Header-Navigations'>
        <button>Dashboard</button>
        <button>Analysis</button>
        <button>Profile</button>
        <button>Settings</button>
      </div>
      <div>
        <button>Log out</button>
      </div>
      <div className='Header-Footer'>
        <h4>userName</h4>
      </div>
    </div>
  );
}

export default Header;