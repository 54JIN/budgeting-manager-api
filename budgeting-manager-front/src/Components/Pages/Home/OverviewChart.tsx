import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto"
import { Doughnut } from "react-chartjs-2"

import './OverviewChart.css';

//Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

function OverviewChart({ datasets }) {
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
          'rgba(27,94,47,255)',
          // 'rgba(228,83,28,255)',
          'rgba(227,79,26,255)',
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
      }
    }
  }

  return (
    <div className="OverviewChart">
      <div>
        <h2>This Month's Finances</h2>
      </div>
      <div className='OverviewChart-Chart'>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

export default OverviewChart;