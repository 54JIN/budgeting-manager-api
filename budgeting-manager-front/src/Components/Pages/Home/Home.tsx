import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

//Components
import Header from '../../Reusable/Header.tsx';
import OverviewChart from './OverviewChart.tsx';
import TransactionHistory from './TransactionHistory.tsx';

/* 
  !-- Things to still implement --!
  1. Loading screen while user data is being fetched before component mounts
  2. Create a Error page when an error occurs
*/

function Home() {
  const navigate = useNavigate();

  //Presets
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  //Server-Side User Data
  const [userData, setUserData] = useState({})

  /*
    Objective: Handle the change of the input boxes to be saved inside the state and render the value.
  */
  useEffect(() => {
    if(window.localStorage.getItem('token') === null) {
      navigate('/login')
    }
  }, [])

  if(isLoading) {
    /*
      Objective: If the page is loading, then display the page with components that makes the users perspective of waiting less tedious
    */
    return (
      <div>Loading . . .</div>
    )
  } else if (isError) {
    /*
      Objective: In the event of an error from server side or other sort navigate to the error page
      !-- Possibly implement: in the event of an error log the user out and remove associated tokens from local storage. --!
    */
    navigate('/error')
  } else {
    return (
      <div className="Home">
        <Header />
        <div>
          <div>
            {/* <OverviewChart /> */}
          </div>
          <div>
            <TransactionHistory />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;