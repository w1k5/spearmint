import React from 'react';
import styles from '../../styles/footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                <p>© {new Date().getFullYear()} Spearmint</p>
                <p>Made with care by Victoria Michalska</p>
            </div>
        </footer>
    );
};

export default Footer;
