import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import { formatAmount } from '../../utils/chart_utils';

// Register Chart.js components
Chart.register(ArcElement, Tooltip);

// Global plugin for center text
Chart.register({
    id: 'centerText',
    beforeDraw: (chart) => {
        if (chart.config.type === 'doughnut') {
            const { ctx, chartArea: { top, bottom, left, right } } = chart;
            const width = right - left;
            const height = bottom - top;
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const sum = chart.data.datasets[0].data.reduce((acc, value) => acc + value, 0);
            const text = formatAmount(sum);

            const fontSize = Math.min(width, height) / 12; // Adjust the divisor to fine-tune the size

            ctx.save();
            ctx.font = `bold ${fontSize}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.fillText(text, centerX, centerY);
            ctx.restore();
        }
    }
});

const DonutChart = ({ data }) => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        if (!data || data.length === 0) {
            setChartData({ labels: [], datasets: [] });
            return;
        }

        // Aggregate data by category
        const categoryTotals = data.reduce((acc, entry) => {
            const category = entry.Category || 'Uncategorized';
            const value = parseFloat(entry.Amount); // Assuming Amount is negative for expenses
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
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        if (context.raw !== null) {
                            return formatAmount(context.raw);
                        }
                    },
                },
            },
        },
    };

    return (
        <div className="chart-wrapper">
            {chartData.labels.length === 0 ? (
                <p>No expenses from chart data available.</p>
            ) : (
                <div className="chart-wrapper">
                    <Doughnut key={JSON.stringify(chartData)} data={chartData} options={options}/>
                </div>
            )}
        </div>
    );
};

export default DonutChart;