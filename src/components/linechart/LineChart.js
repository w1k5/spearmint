// LineChart.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation'
import { CategoryScale, LinearScale, PointElement, LineElement, Chart, Title, Tooltip, Legend } from 'chart.js';
import {formatAmount, groupBy} from '../../utils/chart_utils';
import './linechart.css';

const LineChart = ({ data }) => {
    Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, annotationPlugin);

    const [timeInterval, setTimeInterval] = useState('daily');
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        if (data && data.length > 0) {
            processData();
        }
    }, [data, timeInterval]);

    const handleIntervalChange = (event) => {
        setTimeInterval(event.target.value);
    };

    function average(ctx) {
        const values = ctx.chart.data.datasets[0].data;
        return values.reduce((a, b) => a + b, 0) / values.length;
    }

    const processData = () => {
        let groupedData;
        switch (timeInterval) {
            case 'weekly':
                groupedData = groupBy(data, 'week');
                break;
            case 'yearly':
                groupedData = groupBy(data, 'year');
                break;
            case 'monthly':
                groupedData = groupBy(data, 'month');
                break;
            case 'daily':
            default:
                groupedData = groupBy(data, 'date'); // Group by daily date
                break;
        }

        const labels = Object.keys(groupedData);
        const values = labels.map(label => groupedData[label].reduce((sum, entry) => sum + (parseFloat(entry.amount) || parseFloat(entry.Amount) || 0), 0));

        setChartData({
            labels,
            datasets: [{
                label: 'Amount',
                data: values,
                borderColor: '#8884d8',
                fill: false,
            }]
        });
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time Interval',
                    font: {
                        size: 14,
                    },
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                },
		    reverse: false,
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount',
                    font: {
                        size: 14,
                    },
                },
                ticks: {
                    beginAtZero: false,
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let value = context.raw;
                        if (typeof value === 'number') {
                            return formatAmount(value);
                        }
                        return value;
                    },
                    title: function (context) {
                        const dateStr = context[0].label;
                        const date = new Date(dateStr);
                        return new Intl.DateTimeFormat(context[0].chart.options.locale, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        }).format(date);
                    }
                }
            },
            legend: {
                display: false
            },
            annotation: {
                annotations: {
                    avg: {
                        type: 'line',
                        borderColor: 'black',
                        borderDash: [6, 6],
                        borderDashOffset: 0,
                        borderWidth: 3,
                        label: {
                            position: 'center',
                            display: true,
                            content: (ctx) => 'Average: ' + formatAmount(average(ctx).toFixed(2))
                        },
                        scaleID: 'y',
                        value: (ctx) => average(ctx)
                    }
                },
            }
        },
    };

    return (
        <div className="line-chart-container">
            <div className="chart-controls">
                <label htmlFor="time-interval">Select Time Interval:</label>
                <select id="time-interval" value={timeInterval} onChange={handleIntervalChange}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>
            {chartData.labels.length === 0 ? (
                <p>No chart data available.</p>
            ) : (
                <div className="chart-wrapper">
                    <Line data={chartData} options={chartOptions} />
                </div>
            )}
        </div>
    );
};

export default LineChart;
