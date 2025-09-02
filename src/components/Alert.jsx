import React, { useEffect } from 'react';
import { alertTypeColors } from '../types/alertColorType';

// Componente de alerta genérico y reutilizable
const Alert = ({ message, duration = 2000, onClose, color = alertTypeColors.Success }) => {
    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => {
            onClose && onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [message, duration, onClose]);

    if (!message) return null;

    return (
        <div className={`alert ${color}`}>
            {message}
        </div>
    );
};

export default Alert;