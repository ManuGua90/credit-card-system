import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import './PaginaPrincipal.css'; // Asegúrate de que la ruta al archivo CSS es correcta

const PaginaPrincipal = () => {
  const [usuario, setUsuario] = useState(null);
  const [tarjetas, setTarjetas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        const response = await axios.get('/usuario', {
          headers: {
            Authorization: token,
          },
        });
        setUsuario(response.data);
      } catch (error) {
        console.error(error);
        navigate('/');
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }
        const response = await axios.get('/usuario/tarjetas', {
          headers: { Authorization: token, }
        });
        setTarjetas(response.data);
      } catch (error) {
        console.error('Error al cargar tarjetas:', error);
      }
    };

    fetchUsuario();
  }, [navigate]);

  

  if (!usuario) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="container">
      <h2 className="title">Página Principal</h2>
      <p className="welcome-message">Bienvenido, {usuario.nombre} {usuario.apellido}</p>
      <p className="details">Email: {usuario.email}</p>
      <div className="cards-container">
        {tarjetas.length > 0 ? tarjetas.map((tarjeta, index) => (
          <div key={index} className="card">
            <h3>{"Credito"} - {tarjeta.numero_tarjeta}</h3>
            <p>Fecha de Expiración: {new Date(tarjeta.fecha_vencimiento).toLocaleDateString()}</p>
          </div>
        )) : <p>No hay tarjetas asociadas.</p>}
      </div>
    </div>
  );
};
export default PaginaPrincipal;