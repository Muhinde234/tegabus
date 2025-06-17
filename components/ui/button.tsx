import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2 rounded-full font-semibold transition ${
        disabled
          ? 'bg-gray-400 cursor-not-allowed text-white'
          : 'bg-lime-400 hover:bg-lime-500 text-black'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
