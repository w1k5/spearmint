// Dashboard.js
import React, {useEffect} from 'react';
import LineChart from './linechart/LineChart';
import Table from './table/Table';
import ExpenseBreakdown from './donutchart/ExpenseBreakdown'; // Import the new component
import './dashboard.css'; // Import CSS file for styling

const Dashboard = ({ data }) => {
    const expenses = data.filter(entry => entry.Amount < 0).map(entry => ({
            ...entry,
            Amount: Math.abs(entry.Amount) // Convert to positive
        }
        ));

    useEffect(() => {
        // Trigger any chart re-rendering logic here if necessary
    }, [data]);

    return (
        <div className="dashboard-container">
            <div className="card full-width-card">
                <h2>Expenses Over Time</h2>
                <LineChart data={expenses} />
            </div>
            <div className="card">
                <h2>Expense Breakdown</h2>
                <ExpenseBreakdown data={data.filter(entry => entry.Amount < 0)} />
            </div>
            <div className="card majority-card">
                <h2>Data Table</h2>
                <Table data={data} />
            </div>
        </div>
    );
};

export default Dashboard;