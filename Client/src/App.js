import { Background } from './components/background/Background';
import { Buttons_for_apps } from './components/buttons_for_apps/Buttons_for_apps';
import { Login } from './components/auth/Login'
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ProfileLayout } from './components/profile_layout/Profile_layout'
import { useEffect } from 'react';

function App() {

  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  const loadDoubleLayout = (Layout, Page1, Page2) => {
    return (
      <Layout>
        <Page1>
          <Page2 />
        </Page1>
      </Layout>
    );
  };


  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('jwtToken');
    
    const isTokenValid = (token) => {
      try {
        if (!token){ 
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('user');
          localStorage.removeItem('_id');
          return false;
        };
        
        const decoded = jwtDecode(token);
        const currentTime = Date.now(); // Tiempo actual en segundos
        
        // Verifica si el token ha expirado
        if (decoded.exp < currentTime) {
          localStorage.removeItem('jwtToken'); // Limpia el token expirado
          localStorage.removeItem('user');
          localStorage.removeItem('_id');
          return false;
        }

        return true;
      } catch (error) {
        console.error('Error decodificando token:', error);
        return false;
      }
    };
  
    if (!isTokenValid(token)) {
      // Redirige al login si no hay token o es inválido
      return <Navigate to="/login" replace state={{ from: 'expired' }} />;
    }
  
    return children;
  };
  
  return(
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          {loadDoubleLayout(Background, Buttons_for_apps, ProfileLayout)}
        </ProtectedRoute>
      }/>
      <Route path='/login' element={loadLayout(Background, Login)}/>
    </Routes>
  );
}

export default App;
