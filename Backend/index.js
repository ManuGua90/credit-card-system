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
  host: 'mi-db',
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
  const { nombre, apellido, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = 'INSERT INTO usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, ?)';
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
  const { email, password } = req.body;
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(query, [email], (error, results) => {
    if (error) {
      console.error('Error al autenticar usuario:', error);
      res.status(500).json({ mensaje: 'Error al autenticar usuario' });
    } else if (results.length === 0) {
      res.status(401).json({ mensaje: 'Credenciales inválidas' });
    } else {
      const user = results[0];
      console.log("Autenticación exitosa: ", bcrypt.compareSync(password, user.password));

      if (bcrypt.compareSync(password, user.password)) {
        console.log("correcto")
        const token = jwt.sign({ userId: user.id_usuario }, 'secreto', { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        console.log("incorrecto")
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
app.get('/usuario/tarjetas', authenticateToken, (req, res) => {
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


  // Ruta protegida para obtener los datos del usuario autenticado
app.get('/usuario', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM usuarios WHERE id_usuario = ?';
  
  db.query(query, [req.userId], (error, results) => {
    if (error) {
      console.error('Error al obtener los datos del usuario:', error);
      res.status(500).json({ mensaje: 'Error al obtener los datos del usuario' });
    } else {
      const usuario = results[0];
      res.status(200).json(usuario);
    }
  });
});



//#region tarjetas
// Ruta para solicitar una nueva tarjeta
const generateCardNumber = () => {
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
};

const generateCVV = () => {
  let result = '';
  for (let i = 0; i < 3; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
};

const generateExpiryDate = () => {
  const today = new Date();
  const futureYear = today.getFullYear() + 5;
  return `${futureYear}-${today.getMonth() + 1}-${today.getDate()}`;
};

app.post('/tarjetas/solicitar', authenticateToken, (req, res) => {
  const usuarioId = req.userId; // Asumiendo que tienes un middleware que establece esto

  const numero_tarjeta = generateCardNumber();
  const cvv = generateCVV();
  const fecha_vencimiento = generateExpiryDate();

  const query = 'INSERT INTO tarjetas (id_usuario, numero_tarjeta, fecha_vencimiento, cvv) VALUES (?, ?, ?, ?)';
  db.query(query, [usuarioId, numero_tarjeta, fecha_vencimiento, cvv], (error, results) => {
    if (error) {
      console.error('Error al solicitar nueva tarjeta:', error);
      res.status(500).json({ mensaje: 'Error al solicitar nueva tarjeta' });
    } else {
      res.status(201).json({ mensaje: 'Tarjeta solicitada exitosamente', id_tarjeta: results.insertId });
    }
  });
});

// Ruta para activar una tarjeta
app.post('/tarjetas/activar', authenticateToken, (req, res) => {
  const { id_tarjeta } = req.body;

  const query = 'UPDATE tarjetas SET activa = 1 WHERE id_tarjeta = ? AND id_usuario = ?';
  db.query(query, [id_tarjeta, req.userId], (error, results) => {
    if (error) {
      console.error('Error al activar tarjeta:', error);
      res.status(500).json({ mensaje: 'Error al activar tarjeta' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Tarjeta no encontrada o no pertenece al usuario' });
    } else {
      res.status(200).json({ mensaje: 'Tarjeta activada exitosamente' });
    }
  });
});

// Ruta para bloquear una tarjeta
app.post('/tarjetas/bloquear', authenticateToken, (req, res) => {
  const { id_tarjeta } = req.body;
  const query = 'UPDATE tarjetas SET bloqueada = 1 WHERE id_tarjeta = ? AND id_usuario = ?';
  db.query(query, [id_tarjeta, req.userId], (error, results) => {
    if (error) {
      console.error('Error al bloquear tarjeta:', error);
      res.status(500).json({ mensaje: 'Error al bloquear tarjeta' });
    } else {
      res.status(200).json({ mensaje: 'Tarjeta bloqueada exitosamente' });
    }
  });
});

// Ruta para desbloquear una tarjeta
app.post('/tarjetas/desbloquear', authenticateToken, (req, res) => {
  const { id_tarjeta } = req.body;

  const query = 'UPDATE tarjetas SET bloqueada = 0 WHERE id_tarjeta = ? AND id_usuario = ?';
  db.query(query, [id_tarjeta, req.userId], (error, results) => {
    if (error) {
      console.error('Error al desbloquear tarjeta:', error);
      res.status(500).json({ mensaje: 'Error al desbloquear tarjeta' });
    } else {
      res.status(200).json({ mensaje: 'Tarjeta desbloqueada exitosamente' });
    }
  });
});

//#endregion


//#region estados cuenta
// Endpoint para obtener movimientos de una tarjeta específica
app.get('/movimientos/:idTarjeta', authenticateToken, (req, res) => {
  const { idTarjeta } = req.params;
  const query = `
    SELECT t.monto, t.fecha, t.descripcion, tt.descripcion as tipo_transaccion
    FROM transacciones t
    INNER JOIN tipo_transaccion tt ON t.id_tipo = tt.id_tipo
    WHERE t.id_tarjeta = ?
    ORDER BY t.fecha DESC
  `;

  db.query(query, [idTarjeta], (error, results) => {
    if (error) {
      console.error('Error al obtener movimientos:', error);
      res.status(500).json({ mensaje: 'Error al obtener movimientos' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Endpoint para obtener el estado de cuenta de una tarjeta
app.get('/estado-cuenta/:idTarjeta', authenticateToken, (req, res) => {
  const { idTarjeta } = req.params;
  const query = `
    SELECT t.id_tarjeta, u.nombre, u.apellido, t.limite_credito, SUM(tr.monto) AS saldo_gastado
    FROM tarjetas t
    JOIN usuarios u ON t.id_usuario = u.id_usuario
    LEFT JOIN transacciones tr ON t.id_tarjeta = tr.id_tarjeta
    WHERE t.id_tarjeta = ?
    GROUP BY t.id_tarjeta
  `;

  db.query(query, [idTarjeta], (error, results) => {
    if (error) {
      console.error('Error al obtener el estado de cuenta:', error);
      res.status(500).json({ mensaje: 'Error al obtener el estado de cuenta' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

//#endregion
app.get('/tarjetas/activas', authenticateToken, (req, res) => {
  const usuarioId = req.userId; // Asegúrate de tener acceso al ID del usuario autenticado
  const query = 'SELECT id_tarjeta, numero_tarjeta FROM tarjetas WHERE id_usuario = ? AND activa = 1';
  db.query(query, [usuarioId], (error, results) => {
    if (error) {
      console.error('Error al obtener tarjetas activas:', error);
      res.status(500).json({ mensaje: 'Error al obtener tarjetas activas' });
    } else {
      res.status(200).json(results);
    }
  });
});


// Inicia el servidor
app.listen(3001, () => {
  console.log('Servidor iniciado en el puerto 3001');
});
