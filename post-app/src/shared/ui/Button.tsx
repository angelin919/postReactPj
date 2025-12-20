import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  // Убираем isModalOpen из пропсов, так как кнопка не должна управлять модалкой
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button 
      className={`button ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;