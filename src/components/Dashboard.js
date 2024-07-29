// Dashboard.js
import React, { useState, useEffect } from 'react';
import LineChart from './linechart/LineChart';
import Table from './table/Table';
import DonutChart from './donutchart/DonutChart';
import Modal from '../components/modal/Modal'; // Import Modal component

const Dashboard = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const expenses = data.filter(entry => entry.Amount < 0).map(entry => ({
            ...entry,
            Amount: Math.abs(entry.Amount)
        }
    ));

    const income = data.filter(entry => entry.Amount > 0).map(entry => ({
            ...entry,
            Amount: Math.abs(entry.Amount)
        }
    ));

    useEffect(() => {
    }, [data]);

    return (
        <div className="dashboard-container">
            <div className="card full-width-card">
                <h2>Expenses Over Time</h2>
                <LineChart data={expenses}/>
            </div>
            <div className="card">
                <h2>Expense Breakdown</h2>
                <DonutChart data={expenses}/>
            </div>
            <div className="card majority-card clickable-card" onClick={() => setIsModalOpen(true)}>
                <h2>Data Table</h2>
                <div className="table-container">
                    <Table data={data}/>
                </div>
            </div>
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <Table data={data}/>
                </Modal>
            )}
            <div className="card majority-card">
                <h2>Income Over Time</h2>
                <LineChart data={income}/>
            </div>
            <div className="card">
                <h2>Income Breakdown</h2>
                <DonutChart data={income}/>
            </div>
        </div>
    );
};

export default Dashboard;
