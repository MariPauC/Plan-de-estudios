import React from 'react';
import "./login.css"
import Escudo from "./img/escudo_umng.png";
import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export function Login(){
    const { login, mensaje } = useContext(AuthContext);
    
    var [valuesLogin, setValuesLogin] = useState({
        correo: "",
        contrasena: "",
    });
    
    const handleInputChangeLog = (e) => {
        const { name, value } = e.target;
        setValuesLogin({
            ...valuesLogin,
            [name]: value,
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        login(valuesLogin.correo, valuesLogin.contrasena);
    };

    return(
        <>
        <div className="contIngreso" onSubmit={handleLogin}>
            <div>
                <img  src={Escudo} alt="Escudo Universidad Militar Nueva Granada"></img> 
                <h1>GESTOR PLANES DE ESTUDIO</h1>
            </div>
            <form className="formLogin">
                <h1>INGRESO</h1>
                <label name="correo">Correo:</label>
                <input 
                    type = "email" 
                    name= "correo" 
                    value={valuesLogin.correo}
                    onChange={handleInputChangeLog}
                    required
                />
                <label name= "contrasena">Contraseña:</label>
                <input 
                    type = "password" 
                    name= "contrasena"
                    value={valuesLogin.contrasena}
                    onChange={handleInputChangeLog}
                    required
                />
                <button type = "submit">Acceder</button>
                {mensaje && <p>{mensaje}</p>}
                {/*<a>¿Olvido su contraseña?</a>*/}
            </form>
        </div>
        </>
    );
}