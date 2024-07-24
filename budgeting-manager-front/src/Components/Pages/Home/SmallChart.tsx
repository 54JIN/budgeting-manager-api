import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto"
import { Doughnut } from "react-chartjs-2"

import './SmallChart.css';

//Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

function SmallChart({ title, datasets }) {
  /*
    Objective: Provide the propper information & data for the doughnut chart to be created and displayed
  */
  const data = {
    labels: datasets.map((transaction) => transaction.label),
    datasets: [
      {
        label:'$',
        data: datasets.map((transaction) => transaction.amount),
        backgroundColor: [
          'rgba(27,94,47,255)',
          'rgba(154,210,42,255)',
          'rgba(199,244,46,1)',
          'rgba(66,199,0,255)',
        ],
      }
    ]
  }

  /*
    Objective: Provid the proper details for the visuals of the doughnut chart. 
  */
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      }
    }
  }

  return (
    <div className="SmallChart">
      <div>
        <h2>{title}</h2>
      </div>
      <div>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

export default SmallChart;