const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'crud_react'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

// --- RUTAS DEL CRUD ---

// LEER (Read)
app.get('/api/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// CREAR (Create)
app.post('/api/usuarios', (req, res) => {
    const { nombre, email } = req.body;
    const sql = 'INSERT INTO usuarios (nombre, email) VALUES (?, ?)';
    db.query(sql, [nombre, email], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Usuario creado!', id: result.insertId });
    });
});

// ACTUALIZAR (Update)
app.put('/api/usuarios/:id', (req, res) => {
    const { nombre, email } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?';
    db.query(sql, [nombre, email, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Usuario actualizado!' });
    });
});

// ELIMINAR (Delete)
app.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Usuario eliminado!' });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});