// Dashboard.js
import React, { useState, useEffect } from 'react';
import LineChart from './linechart/LineChart';
import Table from './table/Table';
import ExpenseBreakdown from './donutchart/ExpenseBreakdown';
import Modal from '../components/modal/Modal'; // Import Modal component

const Dashboard = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const expenses = data.filter(entry => entry.Amount < 0).map(entry => ({
            ...entry,
            Amount: Math.abs(entry.Amount)
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
            <div className="card majority-card" onClick={() => setIsModalOpen(true)}>
                <h2>Data Table</h2>
                <div className="table-container">
                    <Table data={data} />
                    <div className="table-overlay" />
                </div>
            </div>
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <Table data={data} />
                </Modal>
            )}
        </div>
    );
};

export default Dashboard;
