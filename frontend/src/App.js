import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://backend-crud-leeb.onrender.com';

function App() {
    const [usuarios, setUsuarios] = useState([]);
    const [formData, setFormData] = useState({ nombre: '', email: '' });
    const [editId, setEditId] = useState(null);

    // Cargar usuarios al iniciar
    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const response = await axios.get(API_URL);
            setUsuarios(response.data);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.email) {
            alert("Nombre y email son requeridos");
            return;
        }

        try {
            if (editId) {
                // Actualizar usuario
                await axios.put(`${API_URL}/${editId}`, formData);
                alert('Usuario actualizado con éxito!');
            } else {
                // Crear usuario
                await axios.post(API_URL, formData);
                alert('Usuario creado con éxito!');
            }
            // Limpiar formulario y recargar lista
            setFormData({ nombre: '', email: '' });
            setEditId(null);
            fetchUsuarios();
        } catch (error) {
            console.error("Error al guardar el usuario:", error);
        }
    };

    const handleEdit = (usuario) => {
        setFormData({ nombre: usuario.nombre, email: usuario.email });
        setEditId(usuario.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                alert('Usuario eliminado con éxito!');
                fetchUsuarios();
            } catch (error) {
                console.error("Error al eliminar el usuario:", error);
            }
        }
    };

    const cancelEdit = () => {
        setFormData({ nombre: '', email: '' });
        setEditId(null);
    }

    return (
        <div className="App">
            <h1>CRUD de Usuarios con React</h1>

            <form onSubmit={handleSubmit} className="user-form">
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
                {editId && <button type="button" onClick={cancelEdit}>Cancelar Edición</button>}
            </form>

            <div className="user-list">
                <h2>Lista de Usuarios</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.nombre}</td>
                                <td>{user.email}</td>
                                <td className="actions">
                                    <button onClick={() => handleEdit(user)}>Editar</button>
                                    <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;