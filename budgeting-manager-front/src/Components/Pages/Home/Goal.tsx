import React from 'react';

import './Goal.css';

function Goal({ data }) {
  return (
    <div className="Goal">
      <p className="Goal-Title">{data.title}</p>
      <p className="Goal-Budget">BUDGET</p>
      <h4 className="Goal-Amount">${data.amount}</h4>
    </div>
  );
}

export default Goal;