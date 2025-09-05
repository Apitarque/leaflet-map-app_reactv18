import React, { useState } from 'react';
import MapView from './components/MapView';
import PinForm from './components/PinForm';
import MenuBar from './components/MenuBar';
import Alert from './components/Alert';
import { usePins } from './hooks/usePins';
import { getBase64SizeMB, getObjectSizeMB } from './utils/mediaSize';
import { alertTypeColors } from './types/alertColorType';
import './styles/map.css';

// Límite de espacio para multimedia en MB, configurable por .env
const MAX_MEDIA_MB = Number(process.env.REACT_APP_MAX_MEDIA_MB) || 5;

// Componente principal de la aplicación
function App() {
    const { pins, addPin } = usePins();
    const [tempPin, setTempPin] = useState({ lat: '', lng: '' });
    const [formResetKey, setFormResetKey] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');

    // Maneja el click en el mapa y actualiza la posición temporal del pin
    const handleMapClick = (latlng) => {
        setTempPin({ lat: latlng.lat, lng: latlng.lng });
    };

    // Maneja el agregado de un nuevo pin
    const handleAddPin = async ({ name, description, type, images, video }) => {
        let totalMB = getBase64SizeMB(images) + getBase64SizeMB(video);

        if (totalMB > MAX_MEDIA_MB) {
            setAlertMessage(
                `El tamaño total de imágenes y video (${totalMB.toFixed(2)} MB) supera el máximo permitido (${MAX_MEDIA_MB} MB). No se puede subir la incidencia.`
            );
            setAlertColor(alertTypeColors.Error);
            return;
        }

        if (!tempPin.lat || !tempPin.lng) return;
        const newPin = {
            name,
            description,
            type,
            coordinates: { lat: tempPin.lat, lng: tempPin.lng },
            images: images || [],
            video: video || null
        };

        // Validar el tamaño total de todos los pines (incluyendo el nuevo)
        const allPins = [...pins, newPin];
        const totalPinsMB = getObjectSizeMB(allPins);
        // Puedes usar el mismo límite o uno diferente, aquí usamos el mismo
        if (totalPinsMB > MAX_MEDIA_MB) {
            setAlertMessage(
                `El tamaño total de todos los incidentes (${totalPinsMB.toFixed(2)} MB) supera el máximo permitido de almacenamiento (${MAX_MEDIA_MB} MB). No se puede subir la incidencia.`
            );
            setAlertColor(alertTypeColors.Error);
            return;
        }

        await addPin(newPin);
        setTempPin({ lat: '', lng: '' });
        setFormResetKey(prev => prev + 1);
        setAlertMessage('Incidente creado correctamente');
        setAlertColor(alertTypeColors.Success);
    };

    return (
        <div className="app-container">
            <MapView pins={pins} onMapClick={handleMapClick} tempPin={tempPin.lat ? tempPin : null} />
            <PinForm
                key={formResetKey}
                lat={tempPin.lat}
                lng={tempPin.lng}
                onSubmit={handleAddPin}
            />
            <Alert
                message={alertMessage}
                duration={2000}
                onClose={() => setAlertMessage('')}
                color={alertColor}
            />
            <MenuBar />
        </div>
    );
}

export default App;