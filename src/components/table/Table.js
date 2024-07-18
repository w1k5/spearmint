import React from 'react';
import styles from '../../styles/table.module.css';
import { formatAmount } from "../../utils/chart_utils"; // Import your CSS file

const Table = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No table data available.</p>;
    }

    return (
        <div className={styles.tableContainer}>
            <table className={styles.tableContents}>
                <thead>
                <tr>
                    <th className={styles.tableTh}>Date</th>
                    <th className={styles.tableTh}>Amount</th>
                    <th className={styles.tableTh}>Category</th>
                    <th className={styles.tableTh}>Description</th>
                </tr>
                </thead>
                <tbody>
                {data.map((entry, index) => (
                    <tr key={index}>
                        <td className={styles.tableTd}>{entry.date || entry.Date}</td>
                        <td className={styles.tableTd}>{formatAmount(entry.amount || entry.Amount)}</td>
                        <td className={styles.tableTd}>{entry.category || entry.Category}</td>
                        <td className={styles.tableTd}>{entry.description || entry.Description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;