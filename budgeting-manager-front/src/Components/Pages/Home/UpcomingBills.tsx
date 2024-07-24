import React from 'react';

import './UpcomingBills.css';

function UpcomingBills({ data }) {
  return (
    <div className="UpcomingBills">
        {data.map(bill => (
            <div className='UpcomingBills-Content-Bill'>
                <div className='UpcomingBills-Content-Bill-Left'>
                    <p className='UpcomingBills-Content-Bill-Left-Title'>{bill.title}</p>
                    <p className='UpcomingBills-Content-Bill-Left-Date'>{bill.dueDate}</p>
                </div>
                <div className='UpcomingBills-Content-Bill-Right'>
                    <p>${bill.amount}</p>
                </div>
            </div>
        ))}
    </div>
  );
}

export default UpcomingBills;