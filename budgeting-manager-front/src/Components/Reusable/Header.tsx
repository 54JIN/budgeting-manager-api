import React from 'react';

import './Header.css';

//Components


function Header({ activeVal }) {
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