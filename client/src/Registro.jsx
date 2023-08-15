import "./privateUser.css"
import "./perfil.css"
import { InputLg } from "./CuadrosTexto"
import { Btnmin } from "./Button"
import { useState, useContext } from "react";
import { AuthContext } from './AuthContext';
import axios from 'axios';

export function RegistroUsuario(){
    const { registrar } = useContext(AuthContext);
    const [mensajeRegistro, setMensajeRegistro] = useState('');
    
    var [valuesRegistro, setvaluesRegistro] = useState({
        nombre: "",
        apellido: "",
        correo:"",
        contrasena: "",
        confirmacion: "",
    });
    
    const handleInputChangeCon = (e) => {
        const { name, value } = e.target;
        setvaluesRegistro({
            ...valuesRegistro,
            [name]: value,
        });
    };
    
    const [contrasenasMatch, setContrasenasMatch] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(valuesRegistro);
        
        if (valuesRegistro.contrasena === valuesRegistro.confirmacion) {
            registrar(valuesRegistro.nombre, valuesRegistro.apellido,valuesRegistro.correo, valuesRegistro.contrasena);
            setContrasenasMatch(true);
        } else {
        setContrasenasMatch(false);
        }
    };

    const handleRegistro = async () => {
        try {
            const response = await axios.post('/api/auth/registro', {  });
            setMensajeRegistro(response.data.message);
        } catch (error) {
            console.error('Error de registro:', error);
            setMensajeRegistro('Error al registrar el usuario');
        }
    };

    return <>
        <div className="contAdm">
            <div className="formUsuario">
                <form onSubmit={handleSubmit}>
                <h3 className="ttlAdmi">Registro de usuario</h3>
                <InputLg 
                    texto = "Nombres:" 
                    name="nombre"
                    value={valuesRegistro.nombre} 
                    onChange={handleInputChangeCon}
                />
                <InputLg 
                    texto = "Apellidos:" 
                    name="apellido"
                    value={valuesRegistro.apellido} 
                    onChange={handleInputChangeCon}
                />
                <InputLg 
                    texto = "Correo:" 
                    tipo="email" 
                    name="correo"
                    value={valuesRegistro.correo} 
                    onChange={handleInputChangeCon}
                />
                <InputLg 
                    texto = "Contraseña:" 
                    tipo="password" 
                    name="contrasena"
                    value={valuesRegistro.contrasena} 
                    onChange={handleInputChangeCon}
                    autocomplete="new-password"
                />
                <InputLg 
                    texto = "Confirmar contraseña:" 
                    tipo="password" 
                    name="confirmacion"
                    value={valuesRegistro.confirmacion} 
                    onChange={handleInputChangeCon}
                    autocomplete="new-password"
                />
                {!contrasenasMatch && <span style={{color:'red'}}>Las contraseñas no coinciden</span>}
                <Btnmin tipo="submit" texto="Registrarse" color="#182B57" onClick={handleRegistro}/>
                {mensajeRegistro && <p>{mensajeRegistro}</p>}
            </form>
            </div>
        </div>
    </>
}