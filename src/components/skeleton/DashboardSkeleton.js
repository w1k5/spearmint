// DashboardSkeleton.js
import React from 'react';
import styles from '../../styles/skeleton.module.css';

const DashboardSkeleton = () => {
    return (
        <div className="dashboard-container">
            <div className={`${styles.skeleton} full-width-card`}></div>
            <div className={`${styles.skeleton} donut-card`}></div>
            <div className={`${styles.skeleton} majority-card`}></div>
        </div>
    );
};

export default DashboardSkeleton;
