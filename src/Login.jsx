import "./login.css"
import { HeaderPriv } from "./Header";
import { FootShort } from "./Footer";
import Escudo from "./img/escudo_umng.png";
import { useHistory } from 'react-router-dom'

export function Login(){
    return(
        <>
        <HeaderPriv/>
        <div className="contIngreso">
            <div>
                <img  src={Escudo} alt="Escudo Universidad Militar Nueva Granada"></img> 
                <h1>GESTOR PLANES DE ESTUDIO</h1>
            </div>
            <form className="formLogin">
                <h1>INGRESO</h1>
                <label name="">Correo:</label>
                <input type = "text" name= "username"/>
                <label>Contraseña:</label>
                <input type = "password" name= "username"/>
                <button type = "submit">Acceder</button>
                <a>¿Olvido su contraseña?</a>
            </form>
        </div>
        <FootShort/>
        </>
        
    );
}