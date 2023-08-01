import "./privateUser.css"
import { HeaderPriv } from "./Header"
import { Titul } from "./Titulo";
import { PagAnterior, PagActual} from "./Breadcrumbs";
import { PanelTab } from "./PanelTab";
import { Btnmin } from "./Button";

import { Link } from "react-router-dom";


export function EditarPlanEst(){ 
    var rol = true;

    return(
        <>
        <HeaderPriv/>
        <div className="contBread">
            <PagAnterior ruta="/Inicio" pagina="Menú principal"/>
            {rol ? <PagAnterior ruta="/InicioProg" pagina="Programa"/> : ""}
            <PagAnterior ruta="/planesEstudios" pagina="Planes de estudio"/>
            <PagActual pagina="Edición plan"/>
        </div>
        <Titul titulo="Edición: Plan de estudios" subt="Ingeniería en Multimedia" />
        <div className="contAdm">
            <h3 className="ttlAdmi">Materias por semestre</h3>
            <PanelTab/>
            <div className="dobleBtn">
                <Link to='/planesEstudios'><Btnmin texto="Atrás" color="#707070"/></Link>
                <Btnmin texto="Guardar" color="#182B57"/>
            </div>
        </div>
        </>
    )
}