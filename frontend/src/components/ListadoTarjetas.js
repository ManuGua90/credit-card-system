import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListadoTarjetas = () => {
  const [tarjetas, setTarjetas] = useState([]);

  useEffect(() => {
    const fetchTarjetas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/tarjetas', {
          headers: {
            Authorization: token,
          },
        });
        setTarjetas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTarjetas();
  }, []);

  return (
    <div>
      <h2>Listado de Tarjetas</h2>
      <Link to="/tarjetas/crear">Crear Nueva Tarjeta</Link>
      <ul>
        {tarjetas.map((tarjeta) => (
          <li key={tarjeta.id}>{tarjeta.numero}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListadoTarjetas;