import React, { useState } from 'react';

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
        <div>
            <select value={selectedHeader} onChange={(e) => setSelectedHeader(e.target.value)}>
                {headers.map(header => (
                    <option key={header} value={header}>{header}</option>
                ))}
            </select>
            <select value={matchType} onChange={(e) => setMatchType(e.target.value)}>
                <option value="contains">Contains</option>
                <option value="exact">Is Exactly</option>
                <option value="startsWith">Starts With</option>
                <option value="endsWith">Ends With</option>
                {/* Add more options as needed */}
            </select>
            <input
                type="text"
                value={stringMatch}
                onChange={(e) => setStringMatch(e.target.value)}
                placeholder={`Enter matching ${matchType.toLowerCase()}`}
            />
            <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category"
            />
            Ignore?
            <input type="checkbox"
                   checked={ignore}
                   onChange={(e) => setIgnore(e.target.checked)}
            />
            <button onClick={handleCategoryCreation}>Confirm New Category</button>
        </div>
    );
};

export default CategoryForm;