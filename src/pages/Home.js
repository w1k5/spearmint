import React, { useState } from 'react';
import DashboardSkeleton from '../components/skeleton/DashboardSkeleton';
import Dashboard from '../components/Dashboard';
import FileUpload from '../components/fileupload/FileUpload';

const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const testData = [
        { Date: '2024-01-01', Amount: 50, Category: 'Groceries', Description: 'Supermarket' },
        { Date: '2024-01-02', Amount: -30, Category: 'Transportation', Description: 'Bus fare' },
        { Date: '2024-01-03', Amount: -100, Category: 'Entertainment', Description: 'Concert tickets' },
        { Date: '2024-01-04', Amount: 2000, Category: 'Salary', Description: 'Monthly salary' },
        { Date: '2024-01-05', Amount: -150, Category: 'Rent', Description: 'Monthly rent' },
        { Date: '2024-01-06', Amount: -20, Category: 'Utilities', Description: 'Electricity bill' },
        { Date: '2024-01-07', Amount: -10, Category: 'Food', Description: 'Fast food' },
        { Date: '2024-01-08', Amount: 100, Category: 'Gift', Description: 'Gift from friend' },
        { Date: '2024-01-09', Amount: -50, Category: 'Shopping', Description: 'Clothing' },
        { Date: '2024-01-10', Amount: -5, Category: 'Transportation', Description: 'Taxi' },
    ];

    const handleFileUploaded = (fileData) => {
        setLoading(true);

        if (!fileData || fileData.length === 0) {
            console.warn("Empty file uploaded or invalid data.");
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
                {loading ? (
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

            <button onClick={() => handleFileUploaded(testData)}>
                Use Test Data
            </button>
        </div>
    );
};

export default Home;