import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistroTransaccion = () => {
  const [idTarjeta, setIdTarjeta] = useState('');
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/transacciones',
        {
          idTarjeta,
          monto,
          descripcion,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      navigate('/transacciones');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Registro de Transacción</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID de Tarjeta:</label>
          <input
            type="text"
            value={idTarjeta}
            onChange={(e) => setIdTarjeta(e.target.value)}
          />
        </div>
        <div>
          <label>Monto:</label>
          <input
            type="text"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <button type="submit">Registrar Transacción</button>
      </form>
    </div>
  );
};

export default RegistroTransaccion;