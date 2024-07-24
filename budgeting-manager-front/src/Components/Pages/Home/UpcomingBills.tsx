import React from 'react';

import './UpcomingBills.css';

function UpcomingBills({ data }) {
  return (
    <div className="UpcomingBills">
        <div className='UpcomingBills-Title'>
            <h2>Upcoming Bills</h2>
        </div>
        <div className='UpcomingBills-Content'>
            {data.map(bill => (
                <div className='UpcomingBills-Content-Bill'>
                    <p>{bill.title}</p>
                    <p>${bill.amount}</p>
                </div>
            ))}
        </div>
    </div>
  );
}

export default UpcomingBills;