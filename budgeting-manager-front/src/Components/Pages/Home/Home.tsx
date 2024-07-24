import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

//Components
import Header from '../../Reusable/Header.tsx';
import OverviewChart from './OverviewChart.tsx';
import SmallChart from './SmallChart.tsx';
import Goal from './Goal.tsx';
import TransactionHistory from './TransactionHistory.tsx';
import UpcomingBills from './UpcomingBills.tsx';

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
  const [userData, setUserData] = useState({overallStatus: [1000, 3000], expenseStatus: [{ label: 'Rent', amount: 1000 }, { label: 'Gas', amount: 200 }, { label: 'Grocceries', amount: 324 }, { label: 'Clothes', amount: 254 },], incomeStatus: [{ label: 'Salary', amount: 7000 }, { label: 'Stocks', amount: 400 }], goals: [{ title: 'Holiday trip', amount: 655.00}, { title: 'Renovation', amount: 235.00}, { title: 'Xbox', amount: 854.00}, { title: 'Birthday', amount: 495.00},], transactions: [{ reciever: 'Starbucks Coffee', type: 'Food', date: '2024-01-23', amount: 75.67 }, { reciever: 'Nogod Bangladesh', type: 'Shopping', date: '2024-01-25', amount: 250.00 }, { reciever: 'Pathao Bangladesh', type: 'Ride Shope', date: '2024-01-26', amount: 19.50 }, { reciever: 'Ofspace LLC', type: 'Design', date: '2024-01-28', amount: 350.00 }], upcomingBills: [{ title: 'Hulu', amount: 12.00 }, { title: 'Netflix', amount: 18.00 }, { title: 'Gas & Electric', amount: 160.00 }, { title: 'Car Insurance', amount: 234.00 },]})
  // const [userData, setUserData] = useState({})

  /*
    Objective: Handle the change of the input boxes to be saved inside the state and render the value.
    !-- Implement error check to ensure the token is still active or within the database --!
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
        <Header activeVal={0}/>
        <div className='Home-Content'>
          <div className='Home-Content-Top'>
            <OverviewChart datasets={userData.overallStatus} />
            <SmallChart title="Expenses" datasets={userData.expenseStatus} />
            <SmallChart title="Incomes" datasets={userData.incomeStatus} />
          </div>
          <div className='Home-Content-Middle'>
            <div className='Home-Content-Goals-Title'>
              <h2>Goals</h2>
            </div>
            <div className='Home-Content-Goals-Content'>
              {userData.goals.map((goal) => (
                <Goal data={goal} />
              ))}
            </div>
          </div>
          <div className='Home-Content-Bottom'>
            <TransactionHistory datasets={userData.transactions} />
            <UpcomingBills data={userData.upcomingBills} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;