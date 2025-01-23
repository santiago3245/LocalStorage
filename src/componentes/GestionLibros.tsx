import React, { useState } from "react";
import './GestionLibros.css';

interface Libro {
    id_libro: number;
    titulo: string;
    genero: string;
    fecha_publicacion: string;
}

interface AutorLibro {
    id_libro: number;
    id_autor: number;
}

const GestionLibros: React.FC<{ libros: Libro[], setLibros: React.Dispatch<React.SetStateAction<Libro[]>>, autoresLibros: AutorLibro[] }> = ({ libros, setLibros, autoresLibros }) => {
    const [titulo, setTitulo] = useState<string>('');
    const [genero, setGenero] = useState<string>('');
    const [fechaPublicacion, setFechaPublicacion] = useState<string>('');

    const agregarLibro = () => {
        if (titulo.trim() && genero.trim() && fechaPublicacion.trim()) {
            const nuevoLibro: Libro = {
                id_libro: libros.length + 1,
                titulo,
                genero,
                fecha_publicacion: fechaPublicacion
            };
            setLibros([...libros, nuevoLibro]);
            setTitulo('');
            setGenero('');
            setFechaPublicacion('');
        }
    };

    const eliminarLibro = (id_libro: number) => {
        const libroEnUso = autoresLibros.some(al => al.id_libro === id_libro);
        if (libroEnUso) {
            alert("No se puede eliminar un libro que está en una relación.");
            return;
        }
        setLibros(libros.filter(libro => libro.id_libro !== id_libro));
    };

    const editarLibro = (id_libro: number, nuevoTitulo: string, nuevoGenero: string, nuevaFechaPublicacion: string) => {
        setLibros(libros.map(libro => libro.id_libro === id_libro ? { ...libro, titulo: nuevoTitulo, genero: nuevoGenero, fecha_publicacion: nuevaFechaPublicacion } : libro));
    };

    return (
        <div className="formulario">
            <h2>Gestión de Libros</h2>
            <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />
            <input
                type="text"
                placeholder="Género"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
            />
            <input
                type="date"
                placeholder="Fecha de Publicación"
                value={fechaPublicacion}
                onChange={(e) => setFechaPublicacion(e.target.value)}
            />
            <button onClick={agregarLibro}>Agregar Libro</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Género</th>
                        <th>Fecha de Publicación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.map(libro => (
                        <tr key={libro.id_libro}>
                            <td>{libro.id_libro}</td>
                            <td>{libro.titulo}</td>
                            <td>{libro.genero}</td>
                            <td>{libro.fecha_publicacion}</td>
                            <td>
                                <button onClick={() => eliminarLibro(libro.id_libro)}>Eliminar</button>
                                <button onClick={() => editarLibro(libro.id_libro, prompt("Nuevo Título:", libro.titulo) || libro.titulo, prompt("Nuevo Género:", libro.genero) || libro.genero, prompt("Nueva Fecha de Publicación:", libro.fecha_publicacion) || libro.fecha_publicacion)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestionLibros;