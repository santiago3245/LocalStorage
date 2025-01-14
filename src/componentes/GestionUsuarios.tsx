import React, { useState } from "react";
import './GestionUsuarios.css';

interface Usuario {
    id: number;
    nombre: string;
    email: string;
}

const GestionUsuarios: React.FC = () => {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [nombre, setNombre] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const agregarUsuario = () => {
        if (nombre.trim() && email.trim()) {
            const nuevoUsuario: Usuario = {
                id: Date.now(),
                nombre,
                email
            };
            setUsuarios([...usuarios, nuevoUsuario]);
            setNombre('');
            setEmail('');
        } else {
            alert('Nombre y email son requeridos');
        }
    }

    const eliminarUsuario = (id: number) => {
        const usuariosFiltrados = usuarios.filter((usuario) => usuario.id !== id);
        setUsuarios(usuariosFiltrados);
    }

    return (
        <div className="formulario">
            <h2>Gestión de Usuarios</h2>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={agregarUsuario}>Agregar Usuario</button>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionUsuarios;