import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import './InicioSesion.css';
import RegistroUsuario from './RegistroUsuario'; // Asegúrate de que la ruta es correcta

const InicioSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/pagina-principal');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert(`Error al iniciar sesión: ${error.response.status} ${error.response.statusText}. Revisa la consola para más detalles.`);
    }
  };

  if (mostrarRegistro) {
    return <RegistroUsuario />;
  }

  return (
    <div className="inicio-sesion">
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Iniciar Sesión</button>
        <button type="button" onClick={() => setMostrarRegistro(true)} className="register-button">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default InicioSesion;
