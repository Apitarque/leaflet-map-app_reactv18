import { useState, useEffect } from 'react';
import { getPins, savePin } from '../services/pinService';

// Hook personalizado para manejar los pines
export function usePins() {
    const [pins, setPins] = useState([]);

    // Carga los pines al montar el componente
    useEffect(() => {
        getPins().then(setPins);
    }, []);

    // Agrega un nuevo pin y actualiza el estado
    const addPin = async (pin) => {
        await savePin(pin);
        setPins(await getPins());
    };

    return { pins, addPin };
}