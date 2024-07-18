import React, { useState } from 'react';
import CategoryForm from './CategoryForm';
import styles from '../../styles/categorymanager.module.css'; // Import your CSS file for styling

const CategoryManager = ({ headers, categories, onCategoryCreate, onClose, onSave }) => {
    const [showAddCategory, setShowAddCategory] = useState(false);

    const handleCategoryCreate = (newCategory, stringMatch, matchType, selectedHeader) => {
        onCategoryCreate(newCategory, stringMatch, matchType, selectedHeader);
        setShowAddCategory(false); // Close add category form after creation
    };

    const handleSave = () => {
        onSave(); // Trigger save callback
        onClose(); // Close the manager
    };

    return (
        <div className={styles.categoryManagerContainer}>
            <div className={styles.categoryManager}>
                <h2>Manage Categories</h2>
                <div className={styles.categoryList}>
                    {categories.map((category, index) => (
                        <div key={index} className={styles.categoryItem}>
                            <span>{category.newCategory}: {category.selectedHeader} {category.matchType} {category.stringMatch}</span>
                        </div>
                    ))}
                </div>
                {showAddCategory ? (
                    <CategoryForm
                        headers={headers}
                        onCategoryCreate={handleCategoryCreate}
                    />
                ) : (
                    <button onClick={() => setShowAddCategory(true)}>Add Category</button>
                )}
                <div className={styles.categoryManagerButtons}>
                    <button onClick={onClose}>Close & Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default CategoryManager;
