import React from 'react';
import styles from '../../styles/footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>© {new Date().getFullYear()} w1k5. All rights reserved.</p>
            <p>Made with ❤️ by Victoria Michalska</p>
        </footer>
    );
};

export default Footer;