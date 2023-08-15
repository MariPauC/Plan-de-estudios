import "./header.css"
import Escudo from "./img/escudo_umng.png"
import EscudoLine from "./img/escudoBlanco_umng.png"
import { Link } from "react-router-dom"
import { MdOutlineAccountCircle, MdKeyboardArrowDown, MdKeyboardArrowLeft, MdPerson, MdLogout } from "react-icons/md";
import { AuthContext } from './AuthContext';
import { useState, useContext } from "react";


//Header para perfiles publicos
export function HeaderPub({programa}){
    return <header >
        <div className="header">
            <h2>PLAN DE ESTUDIOS</h2>
            <p className="program">{programa}</p>
            <img className="imgA" src={Escudo} alt="Escudo Universidad Militar Nueva Granada"></img>
        </div>
    </header>
    
}

//Header para perfiles privados
export function HeaderPriv(){
    const { logout } = useContext(AuthContext);
    
    const [estadoDropdown, cambioEstadoDrop] = useState(false)
    var visibilidad;
    if (estadoDropdown) {
        visibilidad = "visible"
    }
    else{
        visibilidad = "hidden"
    }

    const handleLogout = () => {
        logout();
    };

    return ( 
        
    <header id="privBar" className="header">
        <Link className="imgBar" to="/"><img className="imgB" src={EscudoLine} alt="Escudo Universidad Militar Nueva Granada"></img></Link>
        <h2>GESTOR PLAN DE ESTUDIOS</h2>
        <div className="dropdown" >
            <div className="dropdown-select" onClick={() => cambioEstadoDrop(!estadoDropdown)}>
                <MdOutlineAccountCircle style={{color: 'white', fontSize: '250%',  cursor: "pointer"}}/>
                {estadoDropdown ? <MdKeyboardArrowLeft style={{color: 'white',  fontSize: '210%', cursor: "pointer", rotate:"-moz-initial"}}/>
                :<MdKeyboardArrowDown style={{color: 'white',  fontSize: '210%', cursor: "pointer", rotate:"-moz-initial"}}/>}
            </div>
            <div className="dropdown-list" style={{visibility: visibilidad}} onMouseLeave={() => cambioEstadoDrop(!estadoDropdown)}>
                <Link to="/perfil"><div className="list-object">
                    <MdPerson/>
                    <p>Perfil de usuario</p>
                </div></Link>
                <div className="list-object" id="objtectClose" onClick={handleLogout}  >
                    <MdLogout/>
                    <p>Cerrar sesión</p>
                </div>
            </div>
        </div>
    </header>
    )
}