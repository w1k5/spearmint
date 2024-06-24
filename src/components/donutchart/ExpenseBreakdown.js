import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import {formatAmount } from '../../utils/chart_utils';

const ExpenseBreakdown = ({ data }) => {
    Chart.register(ArcElement, Tooltip);

    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        if (!data || data.length === 0) {
            console.warn("No data available for expense breakdown.");
            setChartData({ labels: [], datasets: [] });
            return;
        }

        // Aggregate data by category
        const categoryTotals = data.reduce((acc, entry) => {
            const category = entry.Category || 'Uncategorized';
            const value = -parseFloat(entry.Amount); // Assuming Amount is negative for expenses
            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category] += value;
            return acc;
        }, {});

        const breakdownData = Object.keys(categoryTotals).map(category => ({
            name: category,
            value: categoryTotals[category],
        }));

        // Define colors for the chart
        const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658', '#ff7f0e', '#ff6b01', '#e86a92'];

        const updatedChartData = {
            labels: breakdownData.map(entry => entry.name),
            datasets: [{
                data: breakdownData.map(entry => entry.value),
                backgroundColor: colors.slice(0, breakdownData.length), // Use only as many colors as there are data entries
                hoverBackgroundColor: colors.slice(0, breakdownData.length),
            }]
        };

        setChartData(updatedChartData);

    }, [data]);

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: formatAmount()
                },
            },
        },
    };

    return (
        <div className="card-container">
            <Doughnut key={JSON.stringify(chartData)} data={chartData} options={options} />
        </div>
    );
};

export default ExpenseBreakdown;