import React, { useState } from 'react';
import DashboardSkeleton from '../components/skeleton/DashboardSkeleton';
import Dashboard from '../components/Dashboard';
import FileUpload from '../components/fileupload/FileUpload';
import CategoryManager from '../components/preferences/CategoryManager';

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [showCategoryManager, setShowCategoryManager] = useState(false);

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
            setData([]);
            setLoading(false);
            return;
        }

        const csvHeaders = Object.keys(fileData[0]);
        setHeaders(csvHeaders);

        const updatedData = applyCategories(fileData, categories);
        setData(updatedData);
        setLoading(false);
    };

    const handleCategoryCreate = (newCategory, stringMatch, matchType, selectedHeader) => {
        if (!newCategory || !stringMatch || !matchType || !selectedHeader) return;

        const updatedCategories = [...categories, { newCategory, stringMatch, matchType, selectedHeader }];
        setCategories(updatedCategories);
    };

    const handleSaveCategories = () => {
        const updatedData = applyCategories(data, categories);
        setData(updatedData);
    };

    const applyCategories = (data, categories) => {
        return data.map(item => {
            const matchedCategory = categories.find(cat => {
                switch (cat.matchType) {
                    case 'exact':
                        return item[cat.selectedHeader].toLowerCase() === cat.stringMatch.toLowerCase();
                    case 'startsWith':
                        return item[cat.selectedHeader].toLowerCase().startsWith(cat.stringMatch.toLowerCase());
                    case 'endsWith':
                        return item[cat.selectedHeader].toLowerCase().endsWith(cat.stringMatch.toLowerCase());
                    case 'contains':
                    default:
                        return item[cat.selectedHeader].toLowerCase().includes(cat.stringMatch.toLowerCase());
                }
            });

            return matchedCategory ? { ...item, Category: matchedCategory.newCategory } : item;
        });
    };

    const handleClearData = () => {
        setData([]);
        setCategories([]);
        setHeaders([]);
    };

    return (
        <div>
            <h1>Dashboard Overview</h1>
            <div>
                <h2>Upload Your Data</h2>
                <FileUpload onFileUploaded={handleFileUploaded} />
            </div>

            <div>
                <button onClick={() => setShowCategoryManager(true)}>Open Category Manager</button>
                {showCategoryManager && (
                    <CategoryManager
                        headers={headers}
                        categories={categories}
                        onCategoryCreate={handleCategoryCreate}
                        onClose={() => setShowCategoryManager(false)}
                        onSave={handleSaveCategories}
                    />
                )}
            </div>

            <div>
                <h2>Quick View: Reports</h2>
                {loading ? (
                    <DashboardSkeleton />
                ) : data.length ? (
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
            <button onClick={() => handleClearData()}>
                Clear Data
            </button>
        </div>
    );
};

export default Home;
