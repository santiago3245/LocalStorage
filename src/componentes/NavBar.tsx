import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
    return (
        <nav>
            <Link to="/" >
                Inicio
            </Link>
            <Link to="/libros" >
                Libros
            </Link>
            <Link to="/autores">
                Autores
            </Link>
            <Link to="/autoreslibros">
                AutoresLibros
            </Link>
            <Link to="/Perfil">
                Acerca de
            </Link>
        </nav>
    );
};

export default Navbar;