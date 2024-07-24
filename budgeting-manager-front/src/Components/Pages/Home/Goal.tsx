import React from 'react';

import './Goal.css';

function Goal({ data }) {
  return (
    <div className="Goal">
      <p className="Goal-Title">{data.title}</p>
      <div>
        <p className="Goal-Budget">BUDGET</p>
        <h4 className="Goal-Amount">${data.amount}.00</h4>
      </div>
    </div>
  );
}

export default Goal;