import styles from './Edit_user.module.css'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { editUser } from '../../api/user'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Toast from '../utils/Toast'
import { motion, AnimatePresence } from "framer-motion";

export const EditUser = ({ onClose }) => {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('jwtToken');
    const [isToastVisible, setIsToastVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    //useState y funcion para llamar y mostrar una notificacion toast
    const [toast, setToast] = useState(null);
    const showToast = (message, type, position) =>{
        setToast({message, type, position});
        setIsToastVisible(true);
        setTimeout(() => {
            setToast(null);
            setIsToastVisible(false);
        }, 3100);
    }

const validationSchema = Yup.object({
    newUser: Yup.string()
        .min(5, 'El nombre debe tener al menos 5 caracteres')
        .max(20, 'El nombre no puede superar los 20 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/, 'Solo letras, números y guiones bajos')
        .when('newPassword', {
        is: (pwd) => !pwd || pwd.trim() === '',
        then: schema => schema.required('Debes cambiar nombre o contraseña'),
        otherwise: schema => schema.notRequired()
        }),
    newPassword: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .max(32, 'La contraseña no puede superar los 32 caracteres')
        .matches(/^[\w!@#$%^&*()\-+=]+$/, 'Solo se permiten letras, números y símbolos especiales: !@#$%^&*()-+=')
        .notRequired(),
    password: Yup.string()
        .required('La contraseña actual es obligatoria')
        .min(6, 'La contraseña actual debe tener al menos 6 caracteres')
        .max(32, 'La contraseña actual no puede superar los 32 caracteres')
    });

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
            const response = await editUser(payload, token);
            setSubmitting(true); // Deshabilita el botón
            // Lógica de post-submit
            if (values.newPassword) {
                // si cambió password, desloguear
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('user');
                localStorage.removeItem('_id');
                showToast(response + " Redirigiendo a inicio de sesión.", "success", "top");
                //alert("redirigiendo a inicion de sesión")
                navigate('/login');
            } else {
                // solo cambió usuario
                // actualizar localStorage y recargar estado
                localStorage.setItem('user', values.newUser);
                showToast(response + " Recargando página.", "success", "top");
                window.location.reload();
                }
        } catch (error) {
            showToast(error.message, "error", "top");
            setSubmitting(false);

        }
        },
    });

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
        onClose(); // Aquí haces lo que hacías en tu `onClose` original
      }, 200); // Tiempo suficiente para que el exit se vea (igual a transition.duration)
    }

    return (
        <div>
            <AnimatePresence mode="wait">
        {isVisible && (
        <motion.div 
            key="agenda"
            initial={{ opacity: 1, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={styles.eu_container}
        >
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
                                <div className={styles.eu_input_error}>{formik.errors.newUser}</div>
                            )}
                    </div>
                    <div className={styles.eu_form_group}>
                        <label className={styles.eu_input_label}>Nueva contraseña: </label>
                        <div></div>
                        <input
                            name="newPassword"
                            type="password"
                            placeholder="*******"
                            className={styles.eu_input}
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                            {formik.touched.newPassword && formik.errors.newPassword && (
                                <div className={styles.eu_input_error}>{formik.errors.newPassword}</div>
                            )}
                    </div>
                    <div className={styles.eu_form_group}>
                        <label className={styles.eu_input_label}>Contraseña actual: </label>
                        <div></div>
                        <input
                            name="password"
                            type="password"
                            placeholder="*******"
                            required
                            className={styles.eu_input}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className={styles.eu_input_error}>{formik.errors.password}</div>
                            )}
                    </div>
                    <button type="submit" className={styles.eu_submit_button} disabled={formik.isSubmitting || isToastVisible}>Guardar cambios</button>
                </form>
            </div>
        </motion.div>
        )}
        </AnimatePresence>
            {toast && <Toast {...toast} onClose={() => setToast(null)}/>}
        </div>
    );
}

