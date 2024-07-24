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
    layout: {
      padding: {
        top: 0,
        bottom: 0
      }
    },
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    }
  }

  return (
    <div className="OverviewChart">
      <div className='OverviewChart-Title'>
        <h2>This Month's Finances</h2>
        <p>May 1 - May 31</p>
      </div>
      <div className='OverviewChart-Content'>
        <div className='OverviewChart-Content-Title'>
          <h2>$3000</h2>
          {/* <p>Earned</p> */}
        </div>
        <div className='OverviewChart-Content-Visual'>
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default OverviewChart;