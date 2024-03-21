// Modal.js

import React, { useState } from 'react';

const Modal = ({ children, onClose = () => { } }) => {

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {/* Modal content */}
            <div onClick={e => e.stopPropagation()} className="bg-white p-8 rounded shadow-lg min-w-[38em]">
                {children}
            </div>
        </div>

    );
};

export default Modal;
