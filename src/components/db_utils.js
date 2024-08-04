// utils/db.js
import { openDB } from 'idb';

const DB_NAME = 'categoriesDB';
const STORE_NAME = 'categoriesStore';
const DB_VERSION = 1;

const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        },
    });
};

export const saveCategory = async (category) => {
    const db = await initDB();
    return db.put(STORE_NAME, category);
};

export const getCategories = async () => {
    const db = await initDB();
    return db.getAll(STORE_NAME);
};

export const deleteCategory = async (id) => {
    const db = await initDB();
    return db.delete(STORE_NAME, id);
};

export const clearCategories = async () => {
    const db = await initDB();
    return db.clear(STORE_NAME);
};