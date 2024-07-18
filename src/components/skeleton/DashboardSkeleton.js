// DashboardSkeleton.js
import React from 'react';
import '../../styles/skeleton.module.css';

const DashboardSkeleton = () => {
    return (
        <div className="dashboard-container dashboard-skeleton">
            <div className="skeleton skeleton-chart"></div>
            <div className="skeleton skeleton-chart"></div>
            <div className="skeleton skeleton-chart"></div>
        </div>
    );
};

export default DashboardSkeleton;
