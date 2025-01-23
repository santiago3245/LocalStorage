import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GestionLibros from './componentes/GestionLibros';
import GestionAutores from './componentes/GestionAutores';
import GestionAutoresLibros from './componentes/GestionAutoresLibros';
import Navbar from './componentes/NavBar';
import Home from "./componentes/Home";
import Contact from "./componentes/Contact";
import Perfil from "./componentes/Perfil";
import './App.css';
import { useEffect, useState } from "react";

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

const App: React.FC = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [autores, setAutores] = useState<Autor[]>([]);
  const [autoresLibros, setAutoresLibros] = useState<AutorLibro[]>([]);

  //leer los datos del local storage al cargar la aplicacion
  useEffect(() => {
    const storedLibros = localStorage.getItem("libros");
    const storedAutores = localStorage.getItem("autores");
    const storedAutoresLibros = localStorage.getItem("autoresLibros");

    if (storedLibros) {
      setLibros(JSON.parse(storedLibros));
    }

    if (storedAutores) {
      setAutores(JSON.parse(storedAutores));
    }

    if (storedAutoresLibros) {
      setAutoresLibros(JSON.parse(storedAutoresLibros));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("libros", JSON.stringify(libros));
  }, [libros]);

  useEffect(() => {
    localStorage.setItem("autores", JSON.stringify(autores));
  }, [autores]);

  useEffect(() => {
    localStorage.setItem("autoresLibros", JSON.stringify(autoresLibros));
  }, [autoresLibros]);

  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/libros" element={<GestionLibros libros={libros} setLibros={setLibros} autoresLibros={autoresLibros} />} />
          <Route path="/autores" element={<GestionAutores autores={autores} setAutores={setAutores} autoresLibros={autoresLibros} />} />
          <Route path="/autoreslibros" element={<GestionAutoresLibros libros={libros} autores={autores} autoresLibros={autoresLibros} setAutoresLibros={setAutoresLibros} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/perfil" element={<Perfil profilePic="https://th.bing.com/th/id/R.02382af7f2365e74f8ac0e861b4dd384?rik=KBByfzC1Gu2vyg&pid=ImgRaw&r=0" username="Santiago Xavier Arroyo Vizuete" bio="Estudiante de la ESPE de la carrera de Ingenieria en Tecnologias de la Información" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;