import "./header.css"
import { MdOutlineAccountCircle, MdKeyboardArrowDown } from "react-icons/md";
import Escudo from "./img/escudo_umng.png"
import EscudoLine from "./img/escudoBlanco_umng.png"
import { Link } from "react-router-dom"

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
    return <header id="privBar" className="header">
        <Link className="imgBar" to="/Inicio"><img className="imgB" src={EscudoLine} alt="Escudo Universidad Militar Nueva Granada"></img></Link>
        <h2>GESTOR PLAN DE ESTUDIOS</h2>
        <div>
            <MdOutlineAccountCircle style={{color: 'white', fontSize: '250%'}}/>
            <MdKeyboardArrowDown style={{color: 'white', marginLeft:'-6%', fontSize: '210%'}}/>
        </div>
    </header>
}