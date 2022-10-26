import './Menu.css'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => {
    const [currentUser, setCurrentUser] = useState(undefined)

    useEffect(() =>{
        /*const user = AuthService.getCurrentUser()
        if(user)
            setCurrentUser(user)*/
    },[])

    1111

    return (
        <nav className="menu">
            <Link to="/alunos">
                Alunos
            </Link>
            <Link to="/cursos">
                Cursos
            </Link>
            <Link to="/carometro">
                Carômetro
            </Link>
        </nav>
    )
}

export default Menu;
