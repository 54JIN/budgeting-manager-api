import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto"
import { Doughnut } from "react-chartjs-2"

import './SmallChart.css';

//Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

function SmallChart({ datasets }) {
  /*
    Objective: Provide the propper information & data for the doughnut chart to be created and displayed
  */
  const data = {
    labels: ['Savings', 'Spending'],
    datasets: [
      {
        label:'$',
        data: datasets,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
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
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Savings vs Spending'
      }
    }
  }

  return (
    <div className="SmallChart">
      <div>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

export default SmallChart;