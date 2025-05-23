import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Profile_layout.module.css"
import { EditUser } from './Edit_user'

export const ProfileLayout = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeComponentEdit, setActiveComponentEdit] = useState(false);

    const handleCerrarSesionClick = () =>{
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        localStorage.removeItem('_id');
        navigate('/login');
        window.location.reload();
    }

    const handleEditClick = () => {
        setIsMenuOpen(!isMenuOpen)
        setActiveComponentEdit(true);
    }

    const handleEditClose = async ()=>{
        setActiveComponentEdit(false);
    }

    const renderComponentEdit = () =>{
        if(activeComponentEdit != false){
            return <EditUser onClose={handleEditClose}/>
        }
    }

    return (
        <div className={styles.profile_layout_container}>
                <div>
                    <button className={styles.pl_button} onClick={() => setIsMenuOpen(!isMenuOpen)}>{user} ▼</button>
                </div>
            
            {isMenuOpen && (
                <div className={styles.pl_dropdown_menu}>
                    <button className={styles.pl_menu_item} onClick={handleEditClick}>Editar perfil</button>
                    <button className={styles.pl_menu_item} onClick={handleCerrarSesionClick}>Cerrar sesión</button>
                </div>
            )}
            {renderComponentEdit()}
        </div>
    );
}

