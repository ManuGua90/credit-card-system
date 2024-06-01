import React, { useState, useEffect } from 'react';
import axios from '../axios'; // Asegúrate de que axios está correctamente configurado para hacer llamadas al API
import './TransactionForm.css'; // Asegúrate de que el archivo CSS está en la misma carpeta y correctamente nombrado

const TransactionForm = ({token, handleClose }) => {
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [id_tipo, setTipo] = useState('');
  const [tarjetas, setTarjetas] = useState([]);
  const [idTarjeta, setIdTarjeta] = useState('');


  useEffect(() => {
    const fetchTarjetas = async () => {
      try {
        const response = await axios.get('/usuario/tarjetas', {
          headers: { Authorization: token }
        });
        setTarjetas(response.data); // Suponiendo que la API devuelve un arreglo de tarjetas
        if (response.data.length > 0) {
          setIdTarjeta(response.data[0].id_tarjeta); // Establecer un valor predeterminado
        }
      } catch (error) {
        console.error('Error al obtener tarjetas:', error);
      }
    };

    fetchTarjetas();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/transacciones/crear', {
        monto, descripcion, id_tipo, idTarjeta
      }, {
        headers: { Authorization: token }
      });
      alert('Transacción realizada con éxito!');
      handleClose();
    } catch (error) {
      alert('Error realizando la transacción');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <input type="number" value={monto} onChange={e => setMonto(e.target.value)} placeholder="Monto" required />
      <input type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción" required />
      <select value={id_tipo} onChange={e => setTipo(e.target.value)} required>
        <option value="">Seleccione tipo</option>
        <option value="1">Crédito</option>
        <option value="2">Débito</option>
        <option value="3">Pago</option>
        <option value="4">Transferencia</option>
      </select>
      <select value={idTarjeta} onChange={e => setIdTarjeta(e.target.value)} required>
        {tarjetas.map(tarjeta => (
          <option value={tarjeta.id_tarjeta}>
            {tarjeta.numero_tarjeta}
          </option>
        ))}
      </select>
      <button type="submit">Enviar Transacción</button>
      {/* <button type="button" onClick={handleClose}>Cerrar</button> */}
    </form>
  );
};

export default TransactionForm;
