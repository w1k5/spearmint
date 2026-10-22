import React from 'react';
import styles from '../../styles/header.module.css'; // Import CSS module for styles

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <div className={styles.logo}>
                    <span className={styles.logoMark} aria-hidden="true">S</span>
                    <div>
                        <p className={styles.brandName}>Spearmint</p>
                        <p className={styles.brandDescriptor}>Personal finance dashboard</p>
                    </div>
                </div>
                <span className={styles.privacyNote}>Private by design</span>
            </div>
        </header>
    );
};

export default Header;
