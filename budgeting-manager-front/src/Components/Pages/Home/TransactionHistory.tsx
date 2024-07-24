import React from 'react';

import './TransactionHistory.css';

//Components

function TransactionHistory({ datasets }) {
  return (
    <div className="TransactionHistory">
      <h2>Transaction History</h2>
      <div className='TransactionHistory-Content'>
        <div className='TransactionHistory-Content-Inner-Pannel'>
            <p className='TransactionHistory-Content-Reciever'>Reciever</p>
            <p className='TransactionHistory-Content-Category'>Types</p>
            <p className='TransactionHistory-Content-Category'>Date</p>
            <p className='TransactionHistory-Content-Category'>Amount</p>
        </div>
        <div className='TransactionHistory-Content-Details'>
          {datasets.map((transaction) => (
            <div className='TransactionHistory-Content-Inner-Pannel'>
              <p className='TransactionHistory-Content-Reciever'>{transaction.reciever}</p>
              <p className='TransactionHistory-Content-Category'>{transaction.type}</p>
              <p className='TransactionHistory-Content-Category'>{transaction.date}</p>
              <p className='TransactionHistory-Content-Category'>{transaction.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;