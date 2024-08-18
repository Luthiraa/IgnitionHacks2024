import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Button.css';

const Button = ({ targetPage, children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const buttonElement = document.querySelector('.button');
        buttonElement.classList.add('fade-in');
    }, []);

    const handleClick = () => {
        const buttonElement = document.querySelector('.button');
        buttonElement.classList.add('wipe');

        setTimeout(() => {
            navigate(targetPage);
        }, 1000); 
    };

    return (
        <button className="button" onClick={handleClick}>
            {children}
        </button>
    );
};

export default Button;