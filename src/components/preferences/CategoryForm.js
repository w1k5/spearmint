import React, { useState } from 'react';
import styles from '../../styles/categorymanager.module.css';

const CategoryForm = ({ headers, onCategoryCreate }) => {
    const [newCategory, setNewCategory] = useState('');
    const [stringMatch, setStringMatch] = useState('');
    const [matchType, setMatchType] = useState('contains');
    const [selectedHeader, setSelectedHeader] = useState(headers[0]);
    const [ignore, setIgnore] = useState(false);

    const handleCategoryCreation = () => {
        onCategoryCreate(newCategory, stringMatch, matchType, selectedHeader, ignore);
        setNewCategory('Unnamed category');
        setStringMatch('');
        setMatchType('contains'); // Reset to default after creation
        setSelectedHeader(headers[0]); // Reset to default after creation
        setIgnore(false);
    };

    return (
        <div className={styles.categoryForm}>
            <div className={styles.field}>
                <label htmlFor="category-field">Transaction field</label>
                <select id="category-field" value={selectedHeader} onChange={(e) => setSelectedHeader(e.target.value)}>
                    {headers.map(header => (
                        <option key={header} value={header}>{header}</option>
                    ))}
                </select>
            </div>
            <div className={styles.field}>
                <label htmlFor="match-type">Match rule</label>
                <select id="match-type" value={matchType} onChange={(e) => setMatchType(e.target.value)}>
                    <option value="contains">Contains</option>
                    <option value="exact">Is exactly</option>
                    <option value="startsWith">Starts with</option>
                    <option value="endsWith">Ends with</option>
                </select>
            </div>
            <div className={styles.field}>
                <label htmlFor="match-value">Value to match</label>
                <input
                    id="match-value"
                    type="text"
                    value={stringMatch}
                    onChange={(e) => setStringMatch(e.target.value)}
                    placeholder={`Enter matching ${matchType.toLowerCase()}`}
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="new-category">New category</label>
                <input
                    id="new-category"
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="e.g. Groceries"
                />
            </div>
            <div className={styles.checkboxField}>
                <input id="ignore-category" type="checkbox" checked={ignore} onChange={(e) => setIgnore(e.target.checked)} />
                <label htmlFor="ignore-category">Exclude matching transactions from reports</label>
            </div>
            <div className={styles.formAction}>
                <button className="button button-primary" onClick={handleCategoryCreation}>Create category</button>
            </div>
        </div>
    );
};

export default CategoryForm;
