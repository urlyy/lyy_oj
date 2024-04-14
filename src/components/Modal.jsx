// Modal.js

import React, { useState } from 'react';

const Modal = ({ children, onClose = () => { } }) => {

    return (
        <div onClick={onClose} className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {/* Modal content */}
            <div className='relative animate__slideInBottom'>
                <button onClick={onClose} className='absolute right-1 top-1 hover:text-slate-500 text-black'>关闭</button>
                <div onClick={e => e.stopPropagation()} className="bg-white p-8 rounded shadow-lg min-w-[38em]">
                    {children}
                </div>
            </div>
        </div>

    );
};

export default Modal;
