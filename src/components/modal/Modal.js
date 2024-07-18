// Modal.js
import React from 'react';
import '../../styles/modal.module.css'; // Import modal CSS

const Modal = ({ children, onClose }) => {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>Χ</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;