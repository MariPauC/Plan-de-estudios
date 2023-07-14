import "./privateUser.css"
import { HeaderPriv } from "./Header";
import { PagAnterior, PagActual} from "./Breadcrumbs"
import { Titul_line, Titul_line2 } from "./Titulo";
import { BtnBgIcon, BtnBgSimple, Btnmin } from "./Button"
import { Link } from "react-router-dom";
import { MdSchool, MdLibraryBooks, MdSupervisorAccount, MdSearch} from "react-icons/md";


export function InicioProg(){
    var rol = false;

    return(
        <>
        <HeaderPriv/>
        {rol ?<><div className="contBread">
                <PagAnterior ruta="/Inicio" pagina="Menú principal"/> 
                <PagActual pagina="Programa"/>
                </div><Titul_line2 titulo="Ingeniería en Multimedia" subt="Facultad ingeniería"/>
            </>
        : <Titul_line titulo="Ingeniería en Multimedia" subt="Facultad ingeniería"/>}
        
        <div className="contAdm">
            <div className="infoAdmi" >
                <Link to="/DatosPrograma"><BtnBgIcon icon = <MdSchool size="75px"/> texto="Datos del programa"/></Link>
                <Link to="/PlanesEstudios"><BtnBgIcon icon= <MdLibraryBooks  size="70px" /> texto="Planes de estudio"/></Link>
                {rol ? <BtnBgIcon icon= <MdSupervisorAccount size="75px"/> texto="Directores"/> : ""}
            </div>
        </div>
        </>
    )
}

export function InicioDec(){
    return(
        <>
        <HeaderPriv/>
        <Titul_line titulo="Programas académicos" subt="Facultad ingeniería" />
        <div className="contAdm">
            <div className="barraBusqueda">
                <input 
                    type="text" 
                    placeholder="Buscar" 
                    name="busqueda"
                    className="textBuscar"
                />
                <button type="button" className="btnBuscar">
                    <MdSearch/>
                </button>
            </div>
            <div className="contBoton">
                <Btnmin texto="Crear programa" color="#182B57"/>
            </div>
            
            <div className="infoAdmi">
                <Link to="/InicioProg"><BtnBgSimple texto="INGENIERÍA AMBIENTAL"/></Link>
                
            </div>
                
        </div>
        </>
    )
}