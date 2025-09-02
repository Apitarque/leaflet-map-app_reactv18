# 🗺️ Leaflet Map App

Una aplicación web hecha en **React** que utiliza **Leaflet.js** y **OpenStreetMap** para mostrar un mapa interactivo donde puedes agregar pines con información, imágenes y videos. Incluye un diseño moderno y responsivo.

---

## 🚀 Funcionalidades

- **Mapa interactivo:** Visualiza y navega el mapa con OpenStreetMap.
- **Agregar pines:** Completa un formulario para agregar incidentes con título, tipo, ubicación, imágenes y video.
- **Tipos de incidente:** Selecciona entre Robo, Drogas o Disturbios.
- **Carrusel de imágenes:** Visualiza múltiples imágenes en cada pin.
- **Video en el pin:** Adjunta un video corto al incidente.
- **Persistencia local:** Los pines se guardan en tu navegador (localStorage).
- **Menú inferior:** Barra de navegación horizontal fija en la parte inferior.
- **Diseño responsivo:** Se adapta a cualquier dispositivo.

---

## 🛠️ Despliegue y uso

### 1. Prerrequisitos

- Node.js v14+
- npm v6+

### 2. Instalación

Clona el repositorio y entra a la carpeta del proyecto:

```sh
git clone https://github.com/Apitarque/leaflet-map-app.git
cd leaflet-map-app
```

Instala las dependencias:

```sh
npm install
```

### 3. Archivo de configuración

Crea un archivo .env en la raíz del proyecto y configura el uso máximo
del localStorage para almacenar multimedios(5MB):

```sh
touch "REACT_APP_MAX_MEDIA_MB=5" >> .env
```

### 4. Ejecuta la aplicación

```sh
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## ✨ Uso

1. **Agrega un pin** usando el formulario lateral derecho:
   - Ingresa título, tipo, latitud, longitud, imágenes y video.
2. **Visualiza los pines** en el mapa. Haz clic en un pin para ver detalles, imágenes (en carrusel) y video.
3. **Navega** usando el menú inferior.

---

## 📦 Build para producción

```sh
npm run build
```
Esto generará la carpeta `build` lista para desplegar en cualquier hosting estático.

---

## 📄 Licencia

MIT

---

**Desarrollo con fines educativos para la Licenciatura en Gestion de Técnología - UNLaM**
