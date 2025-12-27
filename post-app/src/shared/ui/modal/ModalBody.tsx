import React from 'react';

interface ModalBodyProps{
    children:React.ReactNode
}
const ModalBody:React.FC<ModalBodyProps> = ({children}) => {
    return (
        <div
        
        >
            {children}
        </div>
    );
};

export default ModalBody;