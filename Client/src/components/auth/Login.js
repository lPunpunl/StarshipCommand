import styles from './Login.module.css'
import { useState } from 'react';
import { createUser } from '../../api/user'
import { login } from '../../api/auth'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [activeTab, setActiveTab] = useState('login'); // 'login' o 'register'
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
  
    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (activeTab === 'login') {

        const response = await login(formData);
        if(response && response.token){
          localStorage.setItem('jwtToken', response.token);
          localStorage.setItem('user', response.userData.user);
          localStorage.setItem('_id', response.userData._id);
          navigate('/', { replace: true })
        } else {
          alert('Error iniciando sesion')
        }

      } else {

        const response = await createUser(formData);
        if(response){
          alert('User created')
          setActiveTab('login');
          setFormData({
            password: ''
          })
          console.log(response);
        } else {
          alert('Error al crear usuario: ');
        }

      }
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
        <form onSubmit={handleSubmit}>
          
          <div className={styles.login_form_group}>
            <label className={styles.login_form_group_label}>Nombre de usuario</label>
            <input
              className={styles.login_form_group_input}
              type="text"
              name="user"
              value={formData.user}
              onChange={handleInputChange}
              required
              placeholder='Usuario...'
            />
          </div>
          
          <div className={styles.login_form_group}>
            <label className={styles.login_form_group_label}>Contraseña</label>
            <input
              className={styles.login_form_group_input}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder='*****'
            />
          </div>

          <button type="submit" className={styles.login_submit_button}>
            {activeTab === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
    );
}

