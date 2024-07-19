// Modal.js
import React from 'react';
import styles from '../../styles/modal.module.css'; // Import modal CSS

const Modal = ({ children, onClose }) => {
    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.modalClose} onClick={onClose}>Χ</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;