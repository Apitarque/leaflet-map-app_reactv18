import React, { useState } from 'react';

const PinForm = ({ onAddPin }) => {
    const [pinName, setPinName] = useState('');
    const [pinType, setPinType] = useState('Robo');
    const [pinCoordinates, setPinCoordinates] = useState({ lat: '', lng: '' });
    const [media, setMedia] = useState({ images: [], video: null });

    const MAX_FILE_SIZE = 500 * 1024; // 500 KB

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => file.size <= MAX_FILE_SIZE);

        if (validFiles.length < files.length) {
            alert('Algunas imágenes fueron descartadas por superar el tamaño máximo de 500 KB.');
        }

        Promise.all(
            validFiles.map(file => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (ev) => resolve(ev.target.result);
                    reader.readAsDataURL(file);
                });
            })
        ).then(imagesBase64 => {
            setMedia(prev => ({
                ...prev,
                images: imagesBase64
            }));
        });
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > MAX_FILE_SIZE) {
            alert('El archivo de video es demasiado grande. Máximo 500 KB.');
            return;
        }
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setMedia(prev => ({
                    ...prev,
                    video: ev.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pinName && pinCoordinates.lat && pinCoordinates.lng && pinType) {
            onAddPin({
                name: pinName,
                type: pinType,
                coordinates: pinCoordinates,
                images: media.images,
                video: media.video
            });
            setPinName('');
            setPinType('Robo');
            setPinCoordinates({ lat: '', lng: '' });
            setMedia({ images: [], video: null });
        }
    };

    return (
        <form className="pin-form-card" onSubmit={handleSubmit}>
            <div className="pin-form-card-form">
                <div>
                    <label>Título incidente:</label>
                    <input
                        type="text"
                        value={pinName}
                        onChange={(e) => setPinName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Tipo de incidente:</label>
                    <select
                        value={pinType}
                        onChange={(e) => setPinType(e.target.value)}
                        required
                    >
                        <option value="Robo">Robo</option>
                        <option value="Drogas">Drogas</option>
                        <option value="Disturbios">Disturbios</option>
                    </select>
                </div>
                <div>
                    <label>Latitud:</label>
                    <input
                        type="number"
                        value={pinCoordinates.lat}
                        onChange={(e) => setPinCoordinates({ ...pinCoordinates, lat: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Longitud:</label>
                    <input
                        type="number"
                        value={pinCoordinates.lng}
                        onChange={(e) => setPinCoordinates({ ...pinCoordinates, lng: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Imágenes:</label>
                    <input
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                    />
                </div>
                <div>
                    <label>Video:</label>
                    <input
                        type="file"
                        name="video"
                        accept="video/*"
                        onChange={handleVideoChange}
                    />
                </div>
                <button type="submit">Agregar incidente</button>
            </div>
        </form>
    );
};

export default PinForm;