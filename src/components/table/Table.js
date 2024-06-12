import React from 'react';
import './table.css'; // Import your CSS file

const Table = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No table data available.</p>;
    }

    // Function to format amounts to USD
    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

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