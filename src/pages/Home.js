// Home.js
import React, { useState } from 'react';
import DashboardSkeleton from '../components/skeleton/DashboardSkeleton';
import Dashboard from '../components/Dashboard';
import FileUpload from '../components/fileupload/FileUpload';

const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileUploaded = (fileData) => {
        setLoading(true);
        if (fileData.length === 0) {
            console.warn("Empty file uploaded.");
            setData(null);
            setLoading(false);
            return;
        }

        setData(fileData);
        setLoading(false);
    };

    return (
        <div>
            <h1>Dashboard Overview</h1>
            <div>
                <h2>Upload Your Data</h2>
                <FileUpload onFileUploaded={handleFileUploaded} />
            </div>

            <div>
                <h2>Quick View: Reports</h2>
                {loading || null ? (
                    <DashboardSkeleton />
                ) : data ? (
                    <Dashboard data={data} />
                ) : (
                    <>
                    <p>No data available. Please upload a file to view reports.</p>
                        <DashboardSkeleton />
                    </>
                    )}
            </div>
        </div>
    );
};

export default Home;