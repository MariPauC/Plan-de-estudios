import "./privateUser.css"
import { HeaderPriv } from "./Header"
import { Titul } from "./Titulo";
import { Tabla }from "./Table"
import { BtnMdIcon,Btnmin } from "./Button"
import { PagAnterior, PagActual} from "./Breadcrumbs"
import { MdAddCircleOutline } from "react-icons/md";
import { Link } from "react-router-dom";



export function PlanEst(){ 
    var desarrollo = false;
    var rol = true;

    const data = [
        { id: 1, nombre: "Juan", apellido: "Pérez", edad: "Martha Lucia Olivero Franco", estado: "En revisión" },
        ];

    const data2 = [
            { id: 1, nombre: "Juan", apellido: "Pérez", edad: "Martha Lucia Olivero Franco", estado: "En revisión" },
            { id: 2, nombre: "Laura", apellido: "García", edad: 30, estado: "En desarrollo" },
            { id: 3, nombre: "Pedro", apellido: "López", edad: 35, estado: "Actual" },
            { id: 4, nombre: "Samantha", apellido: "Villa", edad: 25, estado: "Antiguo" },
        ];
    
    if (data != ""){
        desarrollo = true;
    }

    return(
        <>
        <HeaderPriv/>
        <div className="contBread">
            <PagAnterior ruta="/Inicio" pagina="Menú principal"/>
            {rol ? <PagAnterior ruta="/InicioProg" pagina="Programa"/> : ""}
            <PagActual pagina="Planes de estudio"/>
        </div>
        <Titul titulo="Planes de estudio" subt="Ingeniería en Multimedia" />
        <div className="contAdm">
            <h3 className="ttlAdmi">En desarrollo</h3>
            {desarrollo ? <Tabla data= {data} estado="Modificado por" accion="Editar"/> 
                        : <div className="btnPlace">
                            <BtnMdIcon icon=<MdAddCircleOutline size="60px"/> texto="Crear plan"/>
                        </div>
            }
            <h3 className="ttlAdmi">Actual</h3>
            <Tabla data= {data2} estado="Aprobado por" accion="Ver"/>
            <h3 className="ttlAdmi">Versiones anteriores</h3>
            <Tabla data= {data2} estado="Aprobado por" accion="Ver"/>
            {rol ? <Link to='/InicioProg'><Btnmin texto="Atrás" color="#707070"/></Link>
                : <Link to='/Inicio'><Btnmin texto="Atrás" color="#707070"/></Link>}

            
        </div>
        </>
    )
}