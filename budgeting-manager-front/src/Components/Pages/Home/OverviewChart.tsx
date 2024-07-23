import React from 'react';
import { Chart as ChartJS } from "chart.js/auto"
import { Doughnut } from "react-chartjs-2"

import './OverviewChart.css';

//Components

function OverviewChart() {
  return (
    <div className="OverviewChart">
      <div>
        <Doughnut 
            data={{
                labels: ["Income", "Expenses"],
                datasets: [
                    {
                        label: "Reve",
                        data: [90, 50],
                        backgroundColor: [
                            "rgba(43,63,229,0.8)",
                            "rgba(250,192,0.8)"
                        ]
                    },
                ]
            }}
            options={{
                plugins: {
                    title: {
                        text: "Monthly Income vs Expenses"
                    }
                }
            }}
        />
      </div>
    </div>
  );
}

export default OverviewChart;