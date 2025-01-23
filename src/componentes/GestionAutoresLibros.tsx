import React, { useState } from "react";
import './GestionAutoresLibros.css';

interface Libro {
    id_libro: number;
    titulo: string;
    genero: string;
    fecha_publicacion: string;
}

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

interface PropsAutoresLibros {
    libros: Libro[];
    autores: Autor[];
    autoresLibros: AutorLibro[];
    setAutoresLibros: React.Dispatch<React.SetStateAction<AutorLibro[]>>;
}

const GestionAutoresLibros: React.FC<PropsAutoresLibros> = ({ libros, autores, autoresLibros, setAutoresLibros }) => {
    const [idLibroSeleccionado, setIdLibroSeleccionado] = useState<number>(0);
    const [idAutorSeleccionado, setIdAutorSeleccionado] = useState<number>(0);

    const agregarAutorLibro = () => {
        if (idLibroSeleccionado && idAutorSeleccionado) {
            const nuevoAutorLibro: AutorLibro = {
                id_libro: idLibroSeleccionado,
                id_autor: idAutorSeleccionado
            };
            setAutoresLibros([...autoresLibros, nuevoAutorLibro]);
            setIdLibroSeleccionado(0);
            setIdAutorSeleccionado(0);
        }
    };

    const eliminarAutorLibro = (id_libro: number, id_autor: number) => {
        setAutoresLibros(autoresLibros.filter(al => al.id_libro !== id_libro || al.id_autor !== id_autor));
    };

    return (
        <div className="formulario">
            <h2>Gestión de Autores y Libros</h2>
            <select value={idLibroSeleccionado} onChange={(e) => setIdLibroSeleccionado(Number(e.target.value))}>
                <option value={0}>Seleccione un libro</option>
                {libros.map(libro => (
                    <option key={libro.id_libro} value={libro.id_libro}>{libro.titulo}</option>
                ))}
            </select>
            <select value={idAutorSeleccionado} onChange={(e) => setIdAutorSeleccionado(Number(e.target.value))}>
                <option value={0}>Seleccione un autor</option>
                {autores.map(autor => (
                    <option key={autor.id_autor} value={autor.id_autor}>{autor.nombre}</option>
                ))}
            </select>
            <button onClick={agregarAutorLibro}>Agregar Asociación</button>
            <table>
                <thead>
                    <tr>
                        <th>Título del Libro</th>
                        <th>Género</th>
                        <th>Fecha de Publicación</th>
                        <th>Nombre del Autor</th>
                        <th>Nacionalidad</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {autoresLibros.map(al => {
                        const libro = libros.find(libro => libro.id_libro === al.id_libro);
                        const autor = autores.find(autor => autor.id_autor === al.id_autor);
                        return (
                            <tr key={`${al.id_libro}-${al.id_autor}`}>
                                <td>{libro?.titulo}</td>
                                <td>{libro?.genero}</td>
                                <td>{libro?.fecha_publicacion}</td>
                                <td>{autor?.nombre}</td>
                                <td>{autor?.nacionalidad}</td>
                                <td>{autor?.fecha_nacimiento}</td>
                                <td>
                                    <button onClick={() => eliminarAutorLibro(al.id_libro, al.id_autor)}>Eliminar</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default GestionAutoresLibros;