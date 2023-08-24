import "./privateUser.css"
import { HeaderPriv } from "./Header";
import { PagAnterior, PagActual} from "./Breadcrumbs"
import { TitulLine, TitulLineDec } from "./Titulo";
import { BtnBgIcon, BtnBgSimple, Btnmin } from "./Button"
import { Link, useParams  } from "react-router-dom";
import { MdSchool, MdLibraryBooks, MdSupervisorAccount } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";

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
    const [search, setSearch] = useState("");
    const [programas, setProgramas] = useState([]);
    
    useEffect(() => {
        axios.get(`/api/listaProgramas`)
        .then(response => {
            setProgramas(response.data) ;
        })
        .catch(error => {
            console.error('Error buscando datos del usuario:', error);
        });
    }, []);
    
    const busqueda = (e) =>{
        setSearch(e.target.value);
    }
    
    let resultBusqueda = []
    if(!search){
        resultBusqueda = programas;
    }else{
        resultBusqueda = programas.filter( (dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
        );
    }

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
                    value={search}
                    onChange={busqueda}
                />
            </div>
            <div className="contBoton">
                <Link to={"/DatosPrograma/crear"} ><Btnmin texto="Crear programa" color="#182B57"/></Link>
            </div>
            
            <div className="infoAdmi">
                {resultBusqueda.map((item) => ( <Link to={"/InicioProg/"+item.pro_nombre.replace(/ /g, '-')+'/'+item.idPrograma} key={item.idPrograma}><BtnBgSimple  key={item.idPrograma} texto={item.pro_nombre}/></Link>))}
            </div>
                
        </div>
        </>
    )
}