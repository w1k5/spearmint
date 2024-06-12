// ExpenseBreakdown.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement, Tooltip} from 'chart.js'
import { options } from '../../utils/chart_utils'

const ExpenseBreakdown = ({ data }) => {
    Chart.register(ArcElement, Tooltip);

    if (!data || data.length === 0) {
        console.warn("No data available for expense breakdown.");
        return <p>No expense data available.</p>;
    }

    // Calculate percentage breakdown
    const breakdownData = data.map(entry => (
        {
        name: entry.Category || 'Uncategorized',
        value: -parseFloat(entry.Amount),
        }
    ));

    // Define colors for the chart
    const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658', '#ff7f0e', '#ff6b01', '#e86a92'];

    const chartData = {
        labels: breakdownData.map(entry => entry.name),
        datasets: [{
            data: breakdownData.map(entry => entry.value),
            backgroundColor: colors.slice(0, data.length), // Use only as many colors as there are data entries
            hoverBackgroundColor: colors.slice(0, data.length),
        }]
    };

    return (
        <div className="card-container">
            <Doughnut data={chartData} options={options}/>
        </div>
    );
};

export default ExpenseBreakdown;
