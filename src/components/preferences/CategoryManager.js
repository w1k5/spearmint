import React, { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm';
import styles from '../../styles/categorymanager.module.css';
import Modal from "../modal/Modal";
import { saveCategory, getCategories, clearCategories } from '../db_utils';

const CategoryManager = ({ headers, onCategoryCreate, onClose, onSave }) => {
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const loadedCategories = await getCategories();
            setCategories(loadedCategories);
        };
        loadCategories();
    }, []);

    const handleCategoryCreate = async (newCategory, stringMatch, matchType, selectedHeader, ignore) => {
        const newCat = { newCategory, stringMatch, matchType, selectedHeader, ignore };
        await saveCategory(newCat);
        setCategories([...categories, newCat]);
        onCategoryCreate(newCategory, stringMatch, matchType, selectedHeader, ignore);
        setShowAddCategory(false); // Close add category form after creation
    };

    const handleSave = () => {
        onSave(); // Trigger save callback
        onClose(); // Close the manager
    };

    const handleClear = async () => {
        await clearCategories();
        setCategories([]);
    };

    return (
        <Modal onClose={onClose}>
            <div>
                <h2>Manage Categories</h2>
                <div className={styles.categoryList}>
                    {categories.map((category, index) => (
                        <div key={index} className={styles.categoryItem}>
                            <span>{category.newCategory}: {category.selectedHeader} {category.matchType} {category.stringMatch} (Ignore: {category.ignore ? 'Yes' : 'No'})</span>
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
                    <button onClick={handleClear}>Clear All</button>
                </div>
            </div>
        </Modal>
    );
};

export default CategoryManager;