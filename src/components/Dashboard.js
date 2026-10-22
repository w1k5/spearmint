// Dashboard.js
import React, { useState, useEffect } from 'react';
import LineChart from './linechart/LineChart';
import Table from './table/Table';
import DonutChart from './donutchart/DonutChart';
import Modal from '../components/modal/Modal'; // Import Modal component

const Dashboard = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const expenses = data.filter(entry => entry.Amount < 0 && !entry.Ignore ).map(entry => ({
            ...entry,
            Amount: Math.abs(entry.Amount)
        }
    ));

    const income = data.filter(entry => entry.Amount > 0 && !entry.Ignore).map(entry => ({
            ...entry,
            Amount: Math.abs(entry.Amount)
        }
    ));

    useEffect(() => {
    }, [data]);

    return (
        <div className="dashboard-container">
            <div className="card full-width-card">
                <div className="card-heading">
                    <div>
                        <p className="card-kicker">Spending trend</p>
                        <h3>Expenses over time</h3>
                    </div>
                </div>
                <LineChart data={expenses}/>
            </div>
            <div className="card donut-card">
                <div className="card-heading">
                    <div>
                        <p className="card-kicker">By category</p>
                        <h3>Expense breakdown</h3>
                    </div>
                </div>
                <DonutChart data={expenses}/>
            </div>
            <div className="card majority-card">
                <div className="card-heading">
                    <div>
                        <p className="card-kicker">All activity</p>
                        <h3>Transactions</h3>
                    </div>
                    <button className="text-button" onClick={() => setIsModalOpen(true)}>Expand table</button>
                </div>
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
                <div className="card-heading">
                    <div>
                        <p className="card-kicker">Earnings trend</p>
                        <h3>Income over time</h3>
                    </div>
                </div>
                <LineChart data={income}/>
            </div>
            <div className="card donut-card">
                <div className="card-heading">
                    <div>
                        <p className="card-kicker">By category</p>
                        <h3>Income breakdown</h3>
                    </div>
                </div>
                <DonutChart data={income}/>
            </div>
        </div>
    );
};

export default Dashboard;
