import React from 'react';
import './Perfil.css';

interface PerfilProps {
    profilePic?: string;
    username?: string;
    bio?: string;
}

const Perfil: React.FC<PerfilProps> = ({ profilePic, username, bio }) => {
    return (
        <div className="perfil-usuario">
            <img src={profilePic} alt="Foto del Usuario" className="profile-pic" />
            <div className="username">{username}</div>
            <div className="bio">{bio}</div>
            <button className="follow-button">Seguir</button>
            <button className="message-button">Mensaje</button>
        </div>
    );
};

export default Perfil;