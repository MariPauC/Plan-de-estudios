import "./navbar.css"
import { MdOutlineAccountCircle, MdKeyboardArrowDown } from "react-icons/md";
import Escudo from "./img/escudo_umng.png"
import EscudoLine from "./img/escudoBlanco_umng.png"

//Navbar para perfiles publicos
export function NavPub({programa}){
    return <header >
        <div class="navbar">
        <h2>PLAN DE ESTUDIOS</h2>
        <p class="program">{programa}</p>
        <img class="imgA" src={Escudo}></img>
        </div>
        <hr id="detalle"/>
    </header>
    
}

//Navbar para perfiles privados
export function NavPriv(){
    return <header id="privBar" class="navbar">
        <a href="#"><img class="imgB" src={EscudoLine}></img></a>
        <h2>GESTOR PLAN DE ESTUDIOS</h2>
        <div>
            <MdOutlineAccountCircle style={{color: 'white', fontSize: '250%'}}/>
            <MdKeyboardArrowDown style={{color: 'white', marginLeft:'-6%', fontSize: '210%'}}/>
        </div>
    </header>
}