import styles from './Edit_user.module.css'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { editUser } from '../../api/user'

export const EditUser = ({ onClose }) => {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('jwtToken');
    const [updateInfo, setUpdateInfo] = useState({
        user: user,
        password: '',
        newUser: undefined,
        newPassword: undefined
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateInfo(prev => ({
            ...prev,
            [name]: value
        }));
        };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(updateInfo.newPassword != undefined || updateInfo.newUser != undefined) {
            console.log(updateInfo);
            try {
                const response = await editUser( updateInfo, token );
                console.log(updateInfo);
                
                if(updateInfo.newUser != undefined){
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('user');
                    localStorage.removeItem('_id');
                    alert('Nombre de usuario actualizado')
                    navigate('/login');
                } else {
                    alert('Contraseña actualizada')
                    window.location.reload();
                }
                
            } catch (error) {
                alert('Error al actualizar los datos')
                console.log(error);
            }
            
        } else {
            //alert("Se necesita ingresar un nuevo nombre de usuario y contraseña");
            console.log("sin datos")
        }
    }

    const handleClose = () =>{
        if (onClose) onClose();
    }

    return (
        <div className={styles.eu_container}>
            <div className={styles.eu_form_container}>
                <div className={styles.eu_close_button_div}>
                    <h1> </h1>
                    <button className={styles.eu_close_button} onClick={handleClose}></button>
                </div>
                <h1 className={styles.eu_header_title}>Editar perfil</h1>
                <form className={styles.eu_form} onSubmit={handleSubmit}>

                    <div className={styles.eu_form_group}>
                        <label className={styles.eu_input_label}>Nuevo nombre de usuario: </label>
                        <input
                        name='newUser'
                        type='text'
                        value={updateInfo.newUser}
                        onChange={handleInputChange}
                        placeholder={user}
                        className={styles.eu_input}
                        />
                    </div>

                    <div className={styles.eu_form_group}>
                        <label className={styles.eu_input_label}>Nueva contraseña: </label>
                        <div></div>
                        <input
                        name='newPassword'
                        type='password'
                        value={updateInfo.newPassword}
                        onChange={handleInputChange}
                        placeholder='*****'
                        className={styles.eu_input}
                        />
                    </div>

                    <div className={styles.eu_form_group}>
                        <label className={styles.eu_input_label}>Contraseña actual: </label>
                        <div></div>
                        <input
                        name='password'
                        type='password'
                        value={updateInfo.password}
                        onChange={handleInputChange}
                        required
                        placeholder='*****'
                        className={styles.eu_input}
                        />
                    </div>

                    <button type="submit" className={styles.eu_submit_button}>Guardar cambios</button>
                </form>
            </div>
        </div>
    );
}

