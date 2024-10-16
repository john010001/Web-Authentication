import React from 'react'
import './style.css'

interface IInputProps {
    icon: string
    placeholder: string
    type?: "text" | "password" | "email"
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error?: string
}

const Input = ({
    icon,
    placeholder,
    type = "text",
    value,
    onChange,
    error
}: IInputProps) => {
    return (
        <>
            {/* 
            . Un icono a la izquierda del input
            . input sin bordes
            . un borde en el bottom que contiene contodo el icono

        */}
            <div className="input-container">
                <div className='input-body'>
                    <img src={icon} alt={placeholder} />
                    <input type={type} placeholder={placeholder}
                        value={value} onChange={onChange}
                    />
                </div>
                <div className="input-border"></div>
                {
                    error && <span className="input-error">{error}</span>
                }
            </div>
        </>
    )
}

export default Input
