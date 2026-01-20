import React from 'react';
import { useModalContext } from './ModalContext';
interface ModalHeaderProps {
    children: React.ReactNode
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children }) => {
    const { onClose } = useModalContext()
    return (
        <div>
            <h2>
                {children}

            </h2>
            <button
                onClick={onClose}
            >✕</button>
        </div>
    );
};

export default ModalHeader;