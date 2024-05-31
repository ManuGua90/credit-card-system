import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import './PaginaPrincipal.css';
import Swal from 'sweetalert2';
import Navbar from './Navbar';  // Ajusta la ruta según sea necesario

const PaginaPrincipal = () => {
  const [usuario, setUsuario] = useState(null);
  const [tarjetas, setTarjetas] = useState([]);
  const [refreshCounter, setRefreshCounter] = useState(0); // Estado para forzar la re-renderización
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const usuarioResponse = await axios.get('/usuario', { headers: { Authorization: token } });
        setUsuario(usuarioResponse.data);
        const tarjetasResponse = await axios.get('/usuario/tarjetas', { headers: { Authorization: token } });
        setTarjetas(tarjetasResponse.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        navigate('/');
      }
    };

    fetchUsuario();
  }, [navigate, refreshCounter]);  // Añadir refreshCounter como dependencia

  const handleCardAction = async (action, id_tarjeta) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`/tarjetas/${action}`, { id_tarjeta }, { headers: { Authorization: token } });
      if (response.status === 200) {
        Swal.fire({
          title: '¡Éxito!',
          text: response.data.mensaje,
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        setRefreshCounter(prev => prev + 1);  // Incrementar el contador para forzar la actualización
      } else {
        Swal.fire({
          title: 'Error',
          text: 'La acción no pudo completarse, por favor intente de nuevo.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    } catch (error) {
      console.error(`Error al ${action} la tarjeta:`, error);
      Swal.fire({
        title: 'Error',
        text: `Error al ${action} la tarjeta.`,
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
  };

  const solicitarNuevaTarjeta = () => {
    const token = localStorage.getItem('token');
    Swal.fire({
      title: 'Solicitar Nueva Tarjeta',
      html: `
        <select id="tipo" class="swal2-input">
          <option value="" disabled selected>Tipo de Tarjeta</option>
          <option value="1">Crédito</option>
          <option value="0">Débito</option>
        </select>
      `,
      confirmButtonText: 'Solicitar',
      focusConfirm: false,
      preConfirm: () => {
        const tipo = Swal.getPopup().querySelector('#tipo').value;
        if (!tipo) {
          Swal.showValidationMessage('Por favor complete todos los campos');
          return;
        }
        return { tipo };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('/tarjetas/solicitar', {
          tipo: result.value.tipo,
        }, {
          headers: { Authorization: token }
        }).then(response => {
          Swal.fire('¡Éxito!', 'La tarjeta ha sido solicitada correctamente.', 'success');
          setRefreshCounter(prev => prev + 1);  // Incrementar el contador para forzar la actualización
        }).catch(error => {
          Swal.fire('Error', 'No se pudo solicitar la tarjeta.', 'error');
        });
      }
    });
  };

  if (!usuario) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="container">
      <Navbar onSolicitarTarjeta={solicitarNuevaTarjeta} />
      <h2 className="title">Página Principal</h2>
      <p className="welcome-message">Bienvenido, {usuario.nombre} {usuario.apellido}</p>
      <p className="details">Email: {usuario.email}</p>
      <div className="cards-container">
  {tarjetas.length > 0 ? tarjetas.map((tarjeta, index) => (
    <div key={index} className={`card ${!tarjeta.activa ? 'card-inactiva' : (tarjeta.bloqueada ? 'card-bloqueada' : 'card-activa')}`}>
      <h3>Credito - {tarjeta.numero_tarjeta}</h3>
      <p>Fecha de Expiración: {new Date(tarjeta.fecha_vencimiento).toLocaleDateString()}</p>
      <p>Estado: {tarjeta.bloqueada ? 'Bloqueada' : (tarjeta.activa ? 'Activa' : 'Inactiva')}</p>
      <div className="button-container">
              <button className="button button-activar"
                      onClick={() => handleCardAction('activar', tarjeta.id_tarjeta)}
                      disabled={tarjeta.activa}
                      >
                Activar
              </button>
              <button className={`button button-bloquear ${!tarjeta.activa ? 'button-disabled' : ''}`}
                      onClick={() => handleCardAction('bloquear', tarjeta.id_tarjeta)}
                      disabled={!tarjeta.activa}>
                Bloquear
              </button>
              <button className={`button button-desbloquear ${!tarjeta.activa ? 'button-disabled' : ''}`}
                      onClick={() => handleCardAction('desbloquear', tarjeta.id_tarjeta)}
                      disabled={!tarjeta.activa}>
                Desbloquear
              </button>
            </div>
          </div>
        )) : <p>No hay tarjetas asociadas.</p>}
      </div>

    </div>
  );
};



export default PaginaPrincipal;
