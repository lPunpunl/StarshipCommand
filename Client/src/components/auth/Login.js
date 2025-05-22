import styles from './Login.module.css'
import { useState } from 'react';
import { createUser } from '../../api/user'
import { login } from '../../api/auth'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Toast from '../utils/Toast'

export const Login = () => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' o 'register'
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  //useState y funcion para llamar y mostrar una notificacion toast
  const [toast, setToast] = useState(null);
  const showToastPromise = (message, type, position) => {
    return new Promise((resolve) => {
      setToast({ message, type, position });
      setTimeout(() => {
        setToast(null);
        resolve(); // Se resuelve la promesa después de ocultar el toast
      }, 3000);
    });
  };
  const showToast = (message, type, position) =>{
    setToast({message, type, position});
    setTimeout(() => setToast(null), 3000);
  };
  
  const validationSchema = Yup.object({
    user: Yup.string()
      .min(5, 'El nombre debe tener al menos 5 caracteres')
      .max(20, 'El nombre no puede superar los 20 caracteres')
      .matches(/^[a-zA-Z0-9_]+$/, 'Solo letras, números y guiones bajos')
      .required('El nombre de usuario es requerido'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .max(32, 'La contraseña no puede superar los 32 caracteres')
      .matches(/^[\w!@#$%^&*()\-+=]+$/, 'Solo se permiten letras, números y símbolos especiales: !@#$%^&*()-+=')
      .required('La contraseña es requerida')
  });

  const formik = useFormik({
    initialValues: {
    user: '',
    password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // arma el payload igual que antes
      const payload = {
        user: values.user,
        password: values.password
      };
      try {
        if (activeTab === 'login') {
          const response = await login(payload);
          if(response && response.token){
            localStorage.setItem('jwtToken', response.token);
            localStorage.setItem('user', response.userData.user);
            localStorage.setItem('_id', response.userData._id);
            navigate('/', { replace: true })
          } else {
            showToast(response, "error", "top")
          }
        } else {
          const response = await createUser(payload);
          if(response){
            setActiveTab('login');
            showToast(response, "success", "top");
          } else {
            showToast(response, "error", "top")
          }
        }
      } catch (error) {
        showToast(error.message, "error", "top");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
  <div className={styles.login_container}>
    <div className={styles.login_form_container}>
      <h1 className={styles.login_header_title}>{activeTab === 'login' ? 'Iniciar Sesión' : 'Registrarse'}</h1>
      
      {/* Pestañas */}
      <div className={styles.login_tabs_row}>
        <button
          className={`${styles.login_select_tab} ${activeTab === 'login' ? styles.login_selected_tab_active : ''}`}
          onClick={() => handleTabChange('login')}
        >
          Inicio de sesión
        </button>
        <button
          className={`${styles.login_select_tab} ${activeTab === 'register' ? styles.login_selected_tab_active : ''}`}
          onClick={() => handleTabChange('register')}
        >
          Registrarse
        </button>
      </div>
      {/* Formulario */}
      <form onSubmit={formik.handleSubmit} noValidate>
        
        <div className={styles.login_form_group}>
          <label className={styles.login_form_group_label}>Nombre de usuario: </label>
          <input
            className={styles.login_form_group_input}
            type="text"
            name="user"
            value={formik.values.user}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            placeholder='Usuario'
          />
          {formik.touched.user && formik.errors.user && (
            <div className={styles.login_input_error}>{formik.errors.user}</div>
          )}
        </div>
        
        <div className={styles.login_form_group}>
          <label className={styles.login_form_group_label}>Contraseña: </label>
          <input
            className={styles.login_form_group_input}
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            placeholder='*******'
          />
          {formik.touched.password && formik.errors.password && (
            <div className={styles.login_input_error}>{formik.errors.password}</div>
          )}
        </div>

        <button type="submit" className={styles.login_submit_button} disabled={formik.isSubmitting}>
          {activeTab === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
        </button>
      </form>
    </div>
    {toast && <Toast {...toast} />}
  </div>
  );
}

