import React from 'react';

const MenuBar = () => {
    return (
        <div
            className="menu-bar"
            style={{
                bottom: 0,
                left: 0,
                right: '20vw',
                top: 'auto',
                height: 48,
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
                gap: 24,
            }}
        >
            <span>Filtros</span>
            <span>Configuración</span>
            <span>Estadísticas</span>
            <span>Perfil</span>
        </div>
    );
};

export default MenuBar;