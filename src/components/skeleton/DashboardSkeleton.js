// DashboardSkeleton.js
import React from 'react';
import './skeleton.css';

const DashboardSkeleton = () => {
    return (
        <div className="dashboard-skeleton">
            <div className="skeleton skeleton-chart"></div>
            <div className="skeleton skeleton-chart"></div>
            <div className="skeleton skeleton-chart"></div>
        </div>
    );
};

export default DashboardSkeleton;
