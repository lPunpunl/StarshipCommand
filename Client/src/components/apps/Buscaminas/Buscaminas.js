import './Buscaminas.css';
import React from 'react';

export const Buscaminas = ({ onClose }) =>{
    return(
        <div>
            <h1>Aplicacion de buscaminas</h1>
            <button onClick={onClose}>Cerrar</button>
        </div>
    );
};