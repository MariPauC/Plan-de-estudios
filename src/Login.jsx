import "./login.css"
import { HeaderPriv } from "./Header";
import { FootShort } from "./Footer";
import Escudo from "./img/escudo_umng.png"
import { FormLogin } from "./Form.jsx"

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
                <input type = "text" name= "username"></input>
                <input type = "password" name= "username"></input>
                <button type = "submit">Ingresar</button>
            </form>
        </div>
        <FootShort/>
        </>
        
    );
}