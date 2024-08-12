import React from 'react';
import styles from '../../styles/header.module.css'; // Import CSS module for styles

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1>&#127807; Spearmint Budgeting</h1>
            </div>
        </header>
    );
};

export default Header;