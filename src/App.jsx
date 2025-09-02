import React, { useState, useEffect } from 'react';
import PinForm from './components/PinForm';
import MapView from './components/MapView';
import MenuBar from './components/MenuBar';
import './styles/map.css';

function App() {
    const [pins, setPins] = useState([]);
    const [tempPin, setTempPin] = useState({ lat: '', lng: '' });
    const [formResetKey, setFormResetKey] = useState(0);
    const [showAlert, setShowAlert] = useState(false);

    // Cargar pines desde localStorage al iniciar
    useEffect(() => {
        const storedPins = localStorage.getItem('pins');
        if (storedPins) {
            setPins(JSON.parse(storedPins));
        }
    }, []);

    // Guardar pines en localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem('pins', JSON.stringify(pins));
    }, [pins]);

    const handleMapClick = (latlng) => {
        setTempPin({ lat: latlng.lat, lng: latlng.lng });
    };

    const handleAddPin = ({ name, type, images, video }) => {
        if (!tempPin.lat || !tempPin.lng) return;
        setPins([
            ...pins,
            {
                name,
                type,
                coordinates: { lat: tempPin.lat, lng: tempPin.lng },
                images: images || [],
                video: video || null
            }
        ]);
        setTempPin({ lat: '', lng: '' });
        setFormResetKey(prev => prev + 1); // fuerza reset del formulario
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
    };

    const handleCancel = () => {
        setTempPin({ lat: '', lng: '' });
    };

    return (
        <div className="app-container">
            <MapView pins={pins} onMapClick={handleMapClick} tempPin={tempPin.lat ? tempPin : null} />
            <PinForm
                key={formResetKey}
                lat={tempPin.lat}
                lng={tempPin.lng}
                onSubmit={handleAddPin}
                onCancel={handleCancel}
            />
            {showAlert && (
                <div className="alert-success">
                    Incidente creado correctamente
                </div>
            )}
            <MenuBar />
        </div>
    );
}

export default App;