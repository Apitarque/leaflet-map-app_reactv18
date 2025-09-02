import React, { useState, useEffect } from 'react';

const PinForm = ({ lat, lng, onSubmit }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('Robo');
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);

    // Limpiar el formulario cuando cambia el punto seleccionado
    useEffect(() => {
        setName('');
        setType('Robo');
        setImages([]);
        setVideo(null);
    }, [lat, lng]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const readers = files.map(file => {
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = (ev) => resolve(ev.target.result);
                reader.readAsDataURL(file);
            });
        });
        Promise.all(readers).then(imagesBase64 => {
            setImages(imagesBase64);
        });
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        setVideo(file ? URL.createObjectURL(file) : null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, type, images, video });
    };

    return (
        <div className="pin-form-card">
            <form className="pin-form-card-form" onSubmit={handleSubmit}>
                <h3>Agregar Incidente</h3>
                <label>
                    Latitud:
                    <input value={lat || ''} disabled />
                </label>
                <label>
                    Longitud:
                    <input value={lng || ''} disabled />
                </label>
                <label>
                    Nombre:
                    <input value={name} onChange={e => setName(e.target.value)} required />
                </label>
                <label>
                    Tipo:
                    <select value={type} onChange={e => setType(e.target.value)}>
                        <option value="Robo">Robo</option>
                        <option value="Drogas">Drogas</option>
                        <option value="Disturbios">Disturbios</option>
                    </select>
                </label>
                <label>
                    Imágenes:
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                    />
                </label>
                {images.length > 0 && (
                    <div style={{ marginBottom: 8 }}>
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`preview-${idx}`}
                                style={{ width: 48, height: 48, objectFit: 'cover', marginRight: 6, borderRadius: 4 }}
                            />
                        ))}
                    </div>
                )}
                <label>
                    Video:
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                    />
                </label>
                {video && (
                    <video src={video} controls style={{ width: '100%', marginBottom: 8, borderRadius: 4 }} />
                )}
                <button type="submit" disabled={!lat || !lng}>Agregar Incidente</button>
            </form>
        </div>
    );
};

export default PinForm;