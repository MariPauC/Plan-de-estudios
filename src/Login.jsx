import "./login.css"
import Escudo from "./img/escudo_umng.png";

export function Login(){
    return(
        <>
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
        </>
    );
}