// Chart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {CategoryScale, LinearScale, PointElement, LineElement, Chart} from 'chart.js';
import { options } from '../../utils/chart_utils'

const LineChart = ({ data }) => {
    Chart.register(CategoryScale, LinearScale, LineElement, PointElement);
    if (!data || data.length === 0) {
        return <p>No chart data available.</p>;
    }

    const chartData = {
        labels: data.map(entry => entry.date || entry.Date),
        datasets: [{
            label: 'Amount',
            data: data.map(entry => entry.amount || entry.Amount),
            borderColor: '#8884d8',
            fill: false,
        }]
    };

    return (
        <div className="card-container">
            <Line data={chartData} options={options} width={4} height={1}/>
        </div>
    );
};

export default LineChart;