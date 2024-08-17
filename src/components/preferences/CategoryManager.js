import React, { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm';
import styles from '../../styles/categorymanager.module.css';
import Modal from "../modal/Modal";
import { getCategories, clearCategories } from '../db_utils';

const CategoryManager = ({ headers, onCategoryCreate, onClose, onSave, onUpload }) => {
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

    const handleDownloadSettings = () => {
        const dataStr = JSON.stringify(categories);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataUri);
        downloadAnchorNode.setAttribute('download', 'category_manager_settings.json');
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleUploadSettings = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedCategories = JSON.parse(e.target.result);
                    setCategories(importedCategories)
                    onUpload(importedCategories);
                } catch (error) {
                    console.error('Failed to load categories:', error);
                }
            };
            reader.readAsText(file);
        }
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
                <div className={styles.categoryManagerButtons}>
                    <button onClick={handleDownloadSettings}>Download Settings</button>
                    <input
                        type="file"
                        accept="application/json"
                        onChange={handleUploadSettings}
                        style={{display: 'none'}}
                        id="uploadSettings"
                    />
                    <label htmlFor="uploadSettings" className={styles.uploadButton}>
                        Upload Settings
                    </label>
                </div>
            </div>
        </Modal>
    );
};

export default CategoryManager;