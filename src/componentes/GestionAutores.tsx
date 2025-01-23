import React, { useState } from "react";
import './GestionAutores.css';

interface Autor {
    id_autor: number;
    nombre: string;
    nacionalidad: string;
    fecha_nacimiento: string;
}

interface AutorLibro {
    id_libro: number;
    id_autor: number;
}

const GestionAutores: React.FC<{ autores: Autor[], setAutores: React.Dispatch<React.SetStateAction<Autor[]>>, autoresLibros: AutorLibro[] }> = ({ autores, setAutores, autoresLibros }) => {
    const [nombre, setNombre] = useState<string>('');
    const [nacionalidad, setNacionalidad] = useState<string>('');
    const [fechaNacimiento, setFechaNacimiento] = useState<string>('');

    const agregarAutor = () => {
        if (nombre.trim() && nacionalidad.trim() && fechaNacimiento.trim()) {
            const nuevoAutor: Autor = {
                id_autor: autores.length + 1,
                nombre,
                nacionalidad,
                fecha_nacimiento: fechaNacimiento
            };
            setAutores([...autores, nuevoAutor]);
            setNombre('');
            setNacionalidad('');
            setFechaNacimiento('');
        }
    };

    const eliminarAutor = (id_autor: number) => {
        const autorEnUso = autoresLibros.some(al => al.id_autor === id_autor);
        if (autorEnUso) {
            alert("No se puede eliminar un autor que está en una relación.");
            return;
        }
        setAutores(autores.filter(autor => autor.id_autor !== id_autor));
    };

    const editarAutor = (id_autor: number, nuevoNombre: string, nuevaNacionalidad: string, nuevaFechaNacimiento: string) => {
        setAutores(autores.map(autor => autor.id_autor === id_autor ? { ...autor, nombre: nuevoNombre, nacionalidad: nuevaNacionalidad, fecha_nacimiento: nuevaFechaNacimiento } : autor));
    };

    return (
        <div className="formulario">
            <h2>Gestión de Autores</h2>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                type="text"
                placeholder="Nacionalidad"
                value={nacionalidad}
                onChange={(e) => setNacionalidad(e.target.value)}
            />
            <input
                type="date"
                placeholder="Fecha de Nacimiento"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
            />
            <button onClick={agregarAutor}>Agregar Autor</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Nacionalidad</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {autores.map(autor => (
                        <tr key={autor.id_autor}>
                            <td>{autor.id_autor}</td>
                            <td>{autor.nombre}</td>
                            <td>{autor.nacionalidad}</td>
                            <td>{autor.fecha_nacimiento}</td>
                            <td>
                                <button onClick={() => eliminarAutor(autor.id_autor)}>Eliminar</button>
                                <button onClick={() => editarAutor(autor.id_autor, prompt("Nuevo Nombre:", autor.nombre) || autor.nombre, prompt("Nueva Nacionalidad:", autor.nacionalidad) || autor.nacionalidad, prompt("Nueva Fecha de Nacimiento:", autor.fecha_nacimiento) || autor.fecha_nacimiento)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestionAutores;