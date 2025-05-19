import './Login.css'
import React, { useState } from 'react';
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
    <div className='Login-container'>
      <div className='Login'>
        <h1>{activeTab === 'login' ? 'Iniciar Sesión' : 'Registrarse'}</h1>
        
        {/* Pestañas */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabChange('login')}
          >
            Login
          </button>
          <button
            className={`tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => handleTabChange('register')}
          >
            Register
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>User</label>
            <input
              type="text"
              name="user"
              value={formData.user}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {activeTab === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
    );
}

