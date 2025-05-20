import styles from './Edit_user.module.css'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { editUser } from '../../api/user'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export const EditUser = ({ onClose }) => {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('jwtToken');

    const validationSchema = Yup.object({
        newUser: Yup.string()
            .min(3, 'El nombre debe tener al menos 3 caracteres')
            .notRequired(),
        newPassword: Yup.string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .notRequired(),
        password: Yup.string()
            .required('La contraseña actual es obligatoria'),
        })
        .test(
        'at-least-one',
        'Debes cambiar nombre o contraseña',
        ({ newUser, newPassword }) => Boolean(newUser || newPassword)
        );

    const formik = useFormik({
        initialValues: {
        newUser: '',
        newPassword: '',
        password: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
        // arma el payload igual que antes
        const payload = {
            user: storedUser,
            password: values.password,
            newUser: values.newUser || undefined,
            newPassword: values.newPassword || undefined,
        };

        try {
            await editUser(payload, token);
            // Lógica de post-submit
            if (values.newPassword) {
            // si cambió password, desloguear
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('user');
            localStorage.removeItem('_id');
            alert('Contraseña actualizada. Por favor, inicia sesión de nuevo.');
            navigate('/login');
            } else {
            // solo cambió usuario
            // actualizar localStorage y recargar estado
            localStorage.setItem('user', values.newUser);
            alert('Nombre de usuario actualizado');
            window.location.reload();
            }
        } catch (error) {
            console.error(error);
            alert('Error al actualizar los datos');
        } finally {
            setSubmitting(false);
        }
        },
    });



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
                <form className={styles.eu_form} onSubmit={formik.handleSubmit} noValidate>
                    <div className={styles.eu_form_group}>
                        <label className={styles.eu_input_label}>Nuevo nombre de usuario: </label>
                        <input
                            name='newUser'
                            type='text'
                            placeholder={storedUser}
                            className={styles.eu_input}
                            value={formik.values.newUser}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                            {formik.touched.newUser && formik.errors.newUser && (
                                <div className={styles.eu_errorCREAR_ESTILO_PARA_ERRORESAAAAAAAAAAAAAAAAAA}>{formik.errors.newUser}</div>
                            )}
                    </div>
                    <div className={styles.eu_form_group}>
                        <label className={styles.eu_input_label}>Nueva contraseña: </label>
                        <div></div>
                        <input
                            name="newPassword"
                            type="password"
                            placeholder="*****"
                            className={styles.eu_input}
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                            {formik.touched.newPassword && formik.errors.newPassword && (
                                <div className={styles.eu_errorCREAR_ESTILO_PARA_ERRORESAAAAAAAAAAAAAAAAA}>{formik.errors.newPassword}</div>
                            )}
                    </div>
                    <div className={styles.eu_form_group}>
                        <label className={styles.eu_input_label}>Contraseña actual: </label>
                        <div></div>
                        <input
                            name="password"
                            type="password"
                            placeholder="*****"
                            required
                            className={styles.eu_input}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className={styles.eu_error}>{formik.errors.password}</div>
                            )}
                    </div>
                    <button type="submit" className={styles.eu_submit_button} disabled={formik.isSubmitting}>Guardar cambios</button>
                </form>
            </div>
        </div>
    );
}

