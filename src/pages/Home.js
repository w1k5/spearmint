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
        <main className="body-container">
            <section className="hero" aria-labelledby="page-title">
                <p className="eyebrow">Your financial snapshot</p>
                <h1 id="page-title">Dashboard overview</h1>
                <p className="hero-copy">Turn a transaction export into a clear, private view of your income and spending.</p>
            </section>

            <section className="section upload-section" aria-labelledby="upload-heading">
                <div className="section-heading">
                    <div>
                        <p className="section-kicker">Import</p>
                        <h2 id="upload-heading">Upload your data</h2>
                    </div>
                    <span className="status-pill">CSV &amp; Excel</span>
                </div>
                <FileUpload onFileUploaded={handleFileUploaded} />
                {data.length > 0 && (
                    <div className="section-actions">
                        <button className="button button-secondary" onClick={() => setShowCategoryManager(true)}>
                            Manage categories
                        </button>
                    </div>
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
            </section>

            <section className="section reports-section" aria-labelledby="reports-heading">
                <div className="section-heading">
                    <div>
                        <p className="section-kicker">Insights</p>
                        <h2 id="reports-heading">Reports</h2>
                    </div>
                    {data.length > 0 && <span className="status-pill status-pill-live">Live overview</span>}
                </div>
                {loading ? (
                    <DashboardSkeleton />
                ) : data.length ? (
                    <Dashboard data={includedEntries} />
                ) : (
                    <div className="empty-state">
                        <div>
                            <h3>Your reports will appear here</h3>
                            <p>Upload a transaction file, or use the sample data to preview the dashboard.</p>
                        </div>
                        <DashboardSkeleton />
                    </div>
                )}
            </section>

            <div className="page-actions" aria-label="Dashboard actions">
                <button className="button button-primary" onClick={() => handleFileUploaded(testData)}>
                    Load sample data
                </button>
                <button className="button button-ghost" onClick={handleClearData}>
                    Clear data
                </button>
            </div>
        </main>
    );
};

export default Home;
