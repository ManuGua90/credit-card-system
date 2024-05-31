import React, { useState } from 'react';
import axios from '../axios';
import './RegistroUsuario.css';
const RegistroUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/usuarios', {
        nombre,
        apellido,
        email,
        password,
      });
      console.log(response.data);
      // Limpiar los campos del formulario después del registro exitoso
      setNombre('');
      setApellido('');
      setEmail('');
      setpassword('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
          className='input-field'
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
          className='input-field'
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
          className='input-field'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>password:</label>
          <input
          className='input-field'
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Registrarse</button>
      </form>
    </div>
  );
};

export default RegistroUsuario;