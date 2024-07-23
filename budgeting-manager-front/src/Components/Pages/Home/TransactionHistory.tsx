import React from 'react';

import './TransactionHistory.css';

//Components

function TransactionHistory() {
  return (
    <div className="TransactionHistory">
      <h2>Transaction History</h2>
      <div className='TransactionHistory-Content'>
        <div className='TransactionHistory-Content-Title'>
            <p>Reciever</p>
            <p>Types</p>
            <p>Date</p>
            <p>Amount</p>
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;