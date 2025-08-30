import React, { useState, useEffect } from 'react';
import PinForm from './components/PinForm';
import MapView from './components/MapView';
import MenuBar from './components/MenuBar';
import './styles/map.css';

function App() {
    const [pins, setPins] = useState([]);

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

    const handleAddPin = (pin) => {
        setPins([...pins, pin]);
    };

    return (
        <div className="map-container">
            <PinForm onAddPin={handleAddPin} />
            <MapView pins={pins} />
            <MenuBar />
        </div>
    );
}

export default App;