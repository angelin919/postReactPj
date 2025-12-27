import React from 'react';
import { ModalContext } from './ModalContaxt'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'



interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> & {
    Header: typeof ModalHeader
    Body: typeof ModalBody
    Footer: typeof ModalFooter

} = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null
    return (
        <>
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
            }}
            onClick={onClose}
        >
        <ModalContext.Provider value={{ isOpen, onClose }}>
            <div
                style={{
                    
                    background: 'green',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.75)',
                    padding: '2rem',
                    borderRadius: '8px',
                    maxWidth: '500px',
                    width: '90%',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    position: 'relative'
                }}
            >
                {children}
            </div>
        </ModalContext.Provider>
        </div>
        </>

    );
};
Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter

export default Modal;