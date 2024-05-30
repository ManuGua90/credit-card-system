const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: '192.168.10.253',
  user: 'pruebas',
  password: 'pruebas',
  database: 'pruebas',
});

// Ruta para verificar la conexión a la base de datos
app.get('/verificar_conexion', (req, res) => {
    db.connect((error) => {
      if (error) {
        console.error('Error al conectar a la base de datos:', error);
        res.status(500).json({ mensaje: 'Error al conectar a la base de datos' });
      } else {
        console.log('Conexión a la base de datos establecida correctamente');
        res.status(200).json({ mensaje: 'Conexión a la base de datos establecida correctamente' });
        db.end(); // Cerrar la conexión después de verificarla
      }
    });
  });

// Ruta de registro de usuarios
app.post('/usuarios', (req, res) => {
  const { nombre, apellido, email, contraseña } = req.body;
  const hashedPassword = bcrypt.hashSync(contraseña, 10);
  const query = 'INSERT INTO usuarios (nombre, apellido, email, contraseña) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, apellido, email, hashedPassword], (error, results) => {
    if (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ mensaje: 'Error al registrar usuario' });
    } else {
      res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    }
  });
});

// Ruta de autenticación de usuarios
app.post('/login', (req, res) => {
  const { email, contraseña } = req.body;
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(query, [email], (error, results) => {
    if (error) {
      console.error('Error al autenticar usuario:', error);
      res.status(500).json({ mensaje: 'Error al autenticar usuario' });
    } else if (results.length === 0) {
      res.status(401).json({ mensaje: 'Credenciales inválidas' });
    } else {
      const user = results[0];
      if (bcrypt.compareSync(contraseña, user.contraseña)) {
        const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }
    }
  });
});

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, 'secreto', (error, decoded) => {
      if (error) {
        console.error('Error al verificar token:', error);
        res.status(401).json({ mensaje: 'Token inválido' });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  } else {
    res.status(401).json({ mensaje: 'Token no proporcionado' });
  }
};

// Ruta protegida para obtener las tarjetas del usuario autenticado
app.get('/tarjetas', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM tarjetas WHERE id_usuario = ?';
  db.query(query, [req.userId], (error, results) => {
    if (error) {
      console.error('Error al obtener tarjetas:', error);
      res.status(500).json({ mensaje: 'Error al obtener tarjetas' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Ruta protegida para obtener las transacciones del usuario autenticado
app.get('/transacciones', authenticateToken, (req, res) => {
    const query = `
      SELECT t.id, t.monto, t.fecha, t.descripcion, tc.numero_tarjeta 
      FROM transacciones t
      INNER JOIN tarjetas tc ON t.id_tarjeta = tc.id
      WHERE tc.id_usuario = ?
    `;
    db.query(query, [req.userId], (error, results) => {
      if (error) {
        console.error('Error al obtener transacciones:', error);
        res.status(500).json({ mensaje: 'Error al obtener transacciones' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  // Ruta protegida para registrar una nueva transacción
  app.post('/transacciones', authenticateToken, (req, res) => {
    const { id_tarjeta, monto, descripcion } = req.body;
    const fecha = new Date();
  
    // Verificar si la tarjeta pertenece al usuario autenticado
    const query = 'SELECT * FROM tarjetas WHERE id = ? AND id_usuario = ?';
    db.query(query, [id_tarjeta, req.userId], (error, results) => {
      if (error) {
        console.error('Error al verificar tarjeta:', error);
        res.status(500).json({ mensaje: 'Error al registrar transacción' });
      } else if (results.length === 0) {
        res.status(403).json({ mensaje: 'Tarjeta no pertenece al usuario' });
      } else {
        // Registrar la nueva transacción
        const insertQuery = 'INSERT INTO transacciones (id_tarjeta, monto, fecha, descripcion) VALUES (?, ?, ?, ?)';
        db.query(insertQuery, [id_tarjeta, monto, fecha, descripcion], (insertError, insertResults) => {
          if (insertError) {
            console.error('Error al registrar transacción:', insertError);
            res.status(500).json({ mensaje: 'Error al registrar transacción' });
          } else {
            res.status(201).json({ mensaje: 'Transacción registrada exitosamente' });
          }
        });
      }
    });
  });

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});