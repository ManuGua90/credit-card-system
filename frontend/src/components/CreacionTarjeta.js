import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreacionTarjeta = () => {
  const [numero, setNumero] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/tarjetas',
        {
          numero,
          fechaVencimiento,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      navigate('/tarjetas');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Creación de Tarjeta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Número:</label>
          <input
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha de Vencimiento:</label>
          <input
            type="text"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
          />
        </div>
        <button type="submit">Crear Tarjeta</button>
      </form>
    </div>
  );
};

export default CreacionTarjeta;