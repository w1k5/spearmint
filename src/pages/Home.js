import React, { useState, useEffect } from 'react';
import DashboardSkeleton from '../components/skeleton/DashboardSkeleton';
import Dashboard from '../components/Dashboard';
import FileUpload from '../components/fileupload/FileUpload';
import CategoryManager from '../components/preferences/CategoryManager';
import { getCategories, saveCategory } from '../components/db_utils'; // Import your IndexedDB utility functions

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [showCategoryManager, setShowCategoryManager] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            const storedCategories = await getCategories();
            setCategories(storedCategories);
        };

        loadCategories();
    }, []);

    const testData = [
        { Date: '2024-01-02', Amount: -30, Category: 'Transportation', Description: 'Bus fare', Ignore: false },
        { Date: '2024-01-03', Amount: -100, Category: 'Entertainment', Description: 'Concert tickets', Ignore: false },
        { Date: '2024-01-04', Amount: 2000, Category: 'Salary', Description: 'Monthly salary', Ignore: false },
        { Date: '2024-01-05', Amount: -150, Category: 'Rent', Description: 'Monthly rent', Ignore: false },
        { Date: '2024-01-06', Amount: -20, Category: 'Utilities', Description: 'Electricity bill', Ignore: false },
        { Date: '2024-01-07', Amount: -10, Category: 'Food', Description: 'Fast food', Ignore: false },
        { Date: '2024-01-08', Amount: 100, Category: 'Gift', Description: 'Gift from friend', Ignore: false },
        { Date: '2024-01-09', Amount: -50, Category: 'Shopping', Description: 'Clothing', Ignore: false },
        { Date: '2024-01-10', Amount: -5, Category: 'Transportation', Description: 'Taxi', Ignore: false },
        { Date: '2024-01-01', Amount: -50, Category: 'Groceries', Description: 'Supermarket', Ignore: false }
    ];

    const includedEntries = data.filter(entry => !entry.Ignore);

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

    const handleCategoryCreate = async (newCategory, stringMatch, matchType, selectedHeader, ignore) => {
        if (!newCategory || !stringMatch || !matchType || !selectedHeader) return;

        const newCategoryObj = { newCategory, stringMatch, matchType, selectedHeader, ignore };
        const updatedCategories = [...categories, newCategoryObj];
        setCategories(updatedCategories);

        // Save new category to IndexedDB
        await saveCategory(newCategoryObj);

        const updatedData = applyCategories(data, updatedCategories);
        setData(updatedData);
    };

    const handleSaveCategories = () => {
        const updatedData = applyCategories(data, categories);
        setData(updatedData);
        setShowCategoryManager(false);
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
                        return item[cat.selectedHeader].toLowerCase().includes(cat.stringMatch.toLowerCase());
                    default:
                        return false;
                }
            });
            return matchedCategory ? { ...item, Category: matchedCategory.newCategory, Ignore: matchedCategory.ignore } : item;
        });
    };

    const handleClearData = () => {
        setData([]);
        setCategories([]);
        setHeaders([]);
    };

    const handleUploadSettings = (importedCategories) => {
        setCategories(importedCategories);

        // Update data with new categories
        const updatedData = applyCategories(data, importedCategories);
        setData(updatedData);
    };

    return (
        <div className="body-container">
            <h1>Dashboard Overview</h1>
            <div>
                <h2>Upload Your Data</h2>
                <FileUpload onFileUploaded={handleFileUploaded} />
            </div>

            <div>
                {data.length > 0 && (
                    <button onClick={() => setShowCategoryManager(true)}>Open Category Manager</button>
                )}
                {showCategoryManager && (
                    <CategoryManager
                        headers={headers}
                        categories={categories}
                        onCategoryCreate={handleCategoryCreate}
                        onClose={() => setShowCategoryManager(false)}
                        onSave={handleSaveCategories}
                        onUpload={handleUploadSettings}
                    />
                )}
            </div>

            <div>
                <h2>Quick View: Reports</h2>
                {loading ? (
                    <DashboardSkeleton />
                ) : data.length ? (
                    <Dashboard data={includedEntries} />
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
            <button onClick={handleClearData}>
                Clear Data
            </button>
        </div>
    );
};

export default Home;