const request = require('supertest');
const app = require('./index'); // Importa la app de Express

describe('Pruebas de API', () => {
  it('debería conectar a la base de datos correctamente', async () => {
    const res = await request(app).get('/verificar_conexion');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('mensaje', 'Conexión a la base de datos establecida correctamente');
  });

  it('debería registrar un usuario correctamente', async () => {
    const newUser = {
      nombre: 'Juan',
      apellido: 'Perez',
      email: 'juan@example.com',
      password: 'password123'
    };
    const res = await request(app).post('/usuarios').send(newUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('mensaje', 'Usuario registrado exitosamente');
  });

  it('debería autenticar un usuario correctamente', async () => {
    const credentials = {
      email: 'juan@example.com',
      password: 'password123'
    };
    const res = await request(app).post('/login').send(credentials);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

});

