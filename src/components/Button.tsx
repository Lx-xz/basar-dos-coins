import React from 'react'

interface ButtonProps {
    id?: string
    className?: string
    label: string
    type?: 'button' | 'submit' | 'reset'
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>
}

const Button: React.FC<ButtonProps> = ({ id, className, label, type, onClick }) => {
    return (
        <button 
            id={id}
            className={className}
            type={type}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default Button