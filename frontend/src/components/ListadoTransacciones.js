import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListadoTransacciones = () => {
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    const fetchTransacciones = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/transacciones', {
          headers: {
            Authorization: token,
          },
        });
        setTransacciones(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransacciones();
  }, []);

  return (
    <div>
      <h2>Listado de Transacciones</h2>
      <Link to="/transacciones/registrar">Registrar Nueva Transacción</Link>
      <ul>
        {transacciones.map((transaccion) => (
          <li key={transaccion.id}>
            {transaccion.monto} - {transaccion.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListadoTransacciones;