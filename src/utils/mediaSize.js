// Calcula el tamaño total en MB de un array de strings base64
export function getBase64SizeMB(base64Array = []) {
    if (!Array.isArray(base64Array)) base64Array = [base64Array];
    let totalBytes = 0;
    base64Array.forEach(str => {
        if (typeof str === 'string') {
            // Elimina el encabezado data:...base64,
            const base64 = str.split(',')[1] || '';
            // 1 caracter base64 = 0.75 bytes
            totalBytes += Math.ceil(base64.length * 0.75);
        }
    });
    return totalBytes / (1024 * 1024); // MB
}

// Calcula el tamaño en MB de un objeto
export function getObjectSizeMB(obj) {
    // Convierte el objeto a string y calcula el tamaño en MB
    const str = JSON.stringify(obj);
    // 1 carácter = 2 bytes en UTF-16, pero localStorage usa UTF-16, así que usamos length * 2
    const bytes = str.length * 2;
    return bytes / (1024 * 1024);
}