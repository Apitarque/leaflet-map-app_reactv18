// Clave de almacenamiento para los pines en localStorage
const STORAGE_KEY = 'pins';

/**
 * Obtiene todos los pines almacenados.
 * Simula una llamada a una API.
 * @returns {Promise<Array>} Lista de pines
 */
export const getPins = async () => {
    const pins = localStorage.getItem(STORAGE_KEY);
    return pins ? JSON.parse(pins) : [];
};

/**
 * Guarda un nuevo pin en el almacenamiento.
 * @param {Object} pin - Objeto pin a guardar
 * @returns {Promise<Object>} El pin guardado
 */
export const savePin = async (pin) => {
    const pins = await getPins();
    const newPins = [...pins, pin];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPins));
    return pin;
};

/**
 * Elimina todos los pines del almacenamiento.
 */
export const clearPins = async () => {
    localStorage.removeItem(STORAGE_KEY);
};

//NOTA: Este servicio simula operaciones de una API usando localStorage para persistencia simple.
// En una aplicación real, estas funciones harían llamadas HTTP a un backend.