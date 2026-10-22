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
            ctx.font = `700 ${fontSize}px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#f2f8f5';
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
        const colors = ['#71e8b5', '#7db7f0', '#c8a8ff', '#f4bf61', '#e58f8f', '#74c9d6', '#b6dc7a', '#dd9ed2', '#a9b6c8', '#ed9d68'];

        const updatedChartData = {
            labels: breakdownData.map(entry => entry.name),
            datasets: [{
                data: breakdownData.map(entry => entry.value),
                backgroundColor: colors.slice(0, breakdownData.length), // Use only as many colors as there are data entries
                hoverBackgroundColor: colors.slice(0, breakdownData.length),
                borderColor: '#10201a',
                borderWidth: 3,
                hoverOffset: 5,
            }]
        };

        setChartData(updatedChartData);

    }, [data]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '67%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#b8cbc2',
                    boxWidth: 10,
                    boxHeight: 10,
                    padding: 14,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: {
                        size: 11,
                    },
                },
            },
            tooltip: {
                backgroundColor: '#07110e',
                borderColor: '#365b4c',
                borderWidth: 1,
                titleColor: '#f2f8f5',
                bodyColor: '#d7e4de',
                padding: 10,
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
