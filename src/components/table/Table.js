import React from 'react';
import './table.css';
import { formatAmount } from "../../utils/chart_utils"; // Import your CSS file

const Table = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No table data available.</p>;
    }

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {data.map((entry, index) => (
                    <tr key={index}>
                        <td>{entry.date || entry.Date}</td>
                        <td>{formatAmount(entry.amount || entry.Amount)}</td>
                        <td>{entry.category || entry.Category}</td>
                        <td>{entry.description || entry.Description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;