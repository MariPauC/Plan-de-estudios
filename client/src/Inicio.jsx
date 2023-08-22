import "./privateUser.css"
import { HeaderPriv } from "./Header";
import { PagAnterior, PagActual} from "./Breadcrumbs"
import { TitulLine, TitulLineDec } from "./Titulo";
import { BtnBgIcon, BtnBgSimple, Btnmin } from "./Button"
import { Link, useParams  } from "react-router-dom";
import { MdSchool, MdLibraryBooks, MdSupervisorAccount, MdSearch} from "react-icons/md";

export function InicioProg({rol}){
    const params = useParams();
    const nombrePrograma = params.nombre;
    const idPrograma = params.id;
    
    return(
        <>
        <HeaderPriv/>
        {rol ?<><div className="contBread">
                <PagAnterior ruta="/" pagina="Menú principal"/> 
                <PagActual pagina="Programa"/>
                </div><TitulLine titulo={nombrePrograma.replace(/-/g,' ')} subt="Facultad ingeniería"/>
            </>
        : <TitulLineDec titulo="Ingeniería en Multimedia" subt="Facultad ingeniería"/>}
        
        <div className="contAdm">
            <div className="infoAdmi" >
                <Link to={"/DatosPrograma/editar/"+nombrePrograma+'/'+idPrograma}><BtnBgIcon icon = <MdSchool size="75px"/> texto="Datos del programa"/></Link>
                <Link to={"/PlanesEstudios/"+nombrePrograma+'/'+idPrograma}><BtnBgIcon icon= <MdLibraryBooks  size="70px" /> texto="Planes de estudio"/></Link>
                {rol ? <Link to={"/directoresPrograma/"+nombrePrograma+'/'+idPrograma}><BtnBgIcon icon= <MdSupervisorAccount size="75px"/> texto="Directores"/></Link> : ""}
            </div>
        </div>
        </>
    )
}

export function InicioDec(){
    const programas =[
        { id: 1, nombre: "Ingeniería Ambiental"  },
        { id: 2, nombre: "Ingeniería Biomédica" },
        { id: 3, nombre: "Ingeniería Civil" },
        { id: 4, nombre: "Ingeniería Industrial"},
        { id: 5, nombre: "Ingeniería en Mecatrónica" },
        { id: 6, nombre: "Ingeniería en Multimedia" },
        { id: 7, nombre: "Ingeniería en Telecomunicaciones" },
        { id: 8, nombre: "Tecnología en Electrónica y Comunicaciones" },
    ];
    
    return(
        <>
        <HeaderPriv/>
        <TitulLineDec titulo="Programas académicos" subt="Facultad ingeniería" />
        <div className="contAdm">
            <div className="barraBusqueda">
                <input 
                    type="search"
                    placeholder="Buscar" 
                    name="busqueda"
                    className="textBuscar"
                />
                <button type="button" className="btnBuscar">
                    <MdSearch/>
                </button>
            </div>
            <div className="contBoton">
                <Link to={"/DatosPrograma/crear"} ><Btnmin texto="Crear programa" color="#182B57"/></Link>
            </div>
            
            <div className="infoAdmi">
                {programas.map((item) => ( <Link to={"/InicioProg/"+item.nombre.replace(/ /g, '-')+'/'+item.id} key={item.id}><BtnBgSimple  key={item.id} texto={item.nombre}/></Link>))}
            </div>
                
        </div>
        </>
    )
}