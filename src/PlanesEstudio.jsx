import "./privateUser.css"
import { HeaderPriv } from "./Header";
import { Titul } from "./Titulo";
import { Tabla }from "./Table"
import { BtnMdIcon,Btnmin } from "./Button"
import { FootShort } from "./Footer";
import { PagAnterior, PagActual} from "./Breadcrumbs"
import { MdAddCircleOutline } from "react-icons/md";

export function PlanEst(){ 
    var desarrollo = false;
    const data = [
            
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
            <PagAnterior pagina="Menú principal"/>
            <PagActual pagina="Planes de estudio"/>
        </div>
        <Titul titulo="Planes de estudio" subt="Ingeniería en Multimedia" />
        <div className="contAdm">
            <h3>En desarrollo</h3>
            {desarrollo ? <Tabla data= {data} estado="Modificado por" accion="Editar"/> 
                        : <div className="btnPlace">
                            <BtnMdIcon icon=<MdAddCircleOutline size="60px"/> texto="Crear plan"/>
                        </div>
            }
            <h3>Actual</h3>
            <Tabla data= {data2} estado="Aprobado por" accion="Ver"/>
            <h3>Versiones anteriores</h3>
            <Tabla data= {data2} estado="Aprobado por" accion="Ver"/>
            <Btnmin texto="Atrás" color="#A9A9A9" />
        </div>
        <FootShort/>
        </>
    )
}