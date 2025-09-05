import React, { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/map.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

// Icono personalizado para los pines guardados
const customSaveIcon = new L.Icon({
    iconUrl: require('../assets/pin-rojo.png'),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

// Icono personalizado para el pin marcado
const customSetIcon = new L.Icon({
    iconUrl: require('../assets/pin-negro.png'),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

// Colores según el tipo de incidente
const typeColors = {
    Robo: '#e53935',
    Drogas: '#43a047',
    Disturbios: '#fbc02d'
};

// Carrusel de imágenes para mostrar en el popup del pin
const ImageCarousel = ({ images }) => {
    const [index, setIndex] = React.useState(0);

    // Reinicia el índice cuando cambian las imágenes
    React.useEffect(() => {
        setIndex(0);
    }, [images]);

    if (!images || images.length === 0) return null;

    const prev = (e) => {
        e.stopPropagation();
        setIndex(i => (i === 0 ? images.length - 1 : i - 1));
    };
    const next = (e) => {
        e.stopPropagation();
        setIndex(i => (i === images.length - 1 ? 0 : i + 1));
    };

    return (
        <div style={{ position: 'relative', marginTop: 10 }}>
            <img
                src={images[index]}
                alt={`Incidente ${index + 1}`}
                style={{ width: '100%', borderRadius: 8, maxHeight: 180, objectFit: 'cover' }}
            />
            {images.length > 1 && (
                <>
                    <button onClick={prev} style={{
                        position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none', borderRadius: '50%',
                        width: 28, height: 28, cursor: 'pointer'
                    }} aria-label="Anterior">&lt;</button>
                    <button onClick={next} style={{
                        position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none', borderRadius: '50%',
                        width: 28, height: 28, cursor: 'pointer'
                    }} aria-label="Siguiente">&gt;</button>
                </>
            )}
            <div style={{
                position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,0.4)', color: '#fff', borderRadius: 8, padding: '2px 8px', fontSize: 12
            }}>
                {index + 1} / {images.length}
            </div>
        </div>
    );
};

// Componente para manejar el click en el mapa y pasar la posición seleccionada al padre
function MapClickHandler({ onMapClick }) {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng);
        }
    });
    return null;
}

// Vista principal del mapa con todos los pines
const MapView = ({ pins, onMapClick, tempPin }) => {
    const defaultPosition = [-34.6693634, -58.5663345];

    return (
        <MapContainer center={defaultPosition} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onMapClick={onMapClick} />
            {pins.map((pin, idx) => (
                <Marker
                    key={idx}
                    position={[
                        parseFloat(pin.coordinates.lat),
                        parseFloat(pin.coordinates.lng)
                    ]}
                    icon={customSaveIcon}
                >
                    <Popup>
                        <div>
                            <div style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                marginBottom: 8
                            }}>{pin.name}</div>
                            <div style={{
                                display: 'inline-block',
                                padding: '4px 12px',
                                borderRadius: 8,
                                background: typeColors[pin.type] || '#ccc',
                                color: '#fff',
                                fontWeight: 'bold',
                                marginBottom: 8
                            }}>
                                {pin.type}
                            </div>
                            <div style={{ fontSize: 12, color: '#555', marginTop: 8 }}>
                                {pin.description}
                            </div>
                            {pin.images && pin.images.length > 0 && (
                                <ImageCarousel images={pin.images} />
                            )}
                            {pin.video && (
                                <div style={{ marginTop: 10 }}>
                                    <video controls style={{ width: '100%', borderRadius: 8 }}>
                                        <source src={pin.video} />
                                        Tu navegador no soporta el video.
                                    </video>
                                </div>
                            )}
                        </div>
                    </Popup>
                </Marker>
            ))}
            {tempPin && (
                <Marker
                    position={[tempPin.lat, tempPin.lng]}
                    icon={customSetIcon}
                />
            )}
        </MapContainer>
    );
};

export default MapView;

