import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom';

interface ICardFormProps {
    title: string;
    children: React.ReactNode;
    link?: string;
    linkText?: string;
}

const CardForm = (props: ICardFormProps) => {
    const {
        title,
        children,
        link,
        linkText,
    } = props
    return (
        <div className='cardForm-container'>
            <div className='cardForm-header'>
                <span className='cardForm-h-title'>{title}</span>
            </div>
            <div className='cardForm-body'>
                {children}
            </div>
            {
                link &&
                <div className='cardForm-footer'>
                    <Link to={`/auth/${link}` || ''} className='cardForm-f-link'>{linkText}</Link>
                </div>
            }
        </div>
    )
}

export default CardForm
