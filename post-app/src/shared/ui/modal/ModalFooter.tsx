import React from 'react';
interface ModalFooterProps {
    children: React.ReactNode
  }

const ModalFooter:React.FC<ModalFooterProps> = ({children}) => {
    return (
        <div style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
          }}>
            {children}
          </div>
    );
};

export default ModalFooter;