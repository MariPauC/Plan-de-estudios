import "./privateUser.css"
import { HeaderPriv } from "./Header";
import { PagAnterior, PagActual} from "./Breadcrumbs"
import { TitulLine } from "./Titulo";
import { BtnBgIcon, BtnBgSimple, Btnmin } from "./Button"
import { Link, useParams  } from "react-router-dom";
import { MdSchool, MdLibraryBooks, MdSupervisorAccount, MdOutlineCoPresent, MdOutlineImportContacts, MdOutlineCorporateFare } from "react-icons/md";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from './AuthContext';
import axios from "axios";

export function InicioProg(){
    const params = useParams();
    const nombrePrograma= params.nombre;
    const idPrograma= params.id;
    const [nombreFacultad, setFacultad] = useState("");

    const {usuario} = useContext(AuthContext)
    const idUsuario = usuario.idUsuario;

    useEffect(() => {
        axios.get(`/api/decano/${idUsuario}`)
        .then(response => {
            const dataArray = response.data;
            if (dataArray.length > 0) {
                const data = dataArray[0]; 
                setFacultad(data.fac_nombre);
            }
        })
        .catch(error => {
            console.error('Error buscando datos del decano:', error);
        });
    }, []);    

    return(
        <>
        <HeaderPriv/>
        <div className="contBread">
            <PagAnterior ruta="/" pagina="Menú principal"/> 
            <PagActual pagina="Programa"/>
        </div>
        <TitulLine titulo={nombrePrograma.replace(/-/g,' ')} subt={"Facultad "+nombreFacultad}/>
        
        <div className="contAdm">
            <div className="infoAdmi" >
                <Link to={"/DatosPrograma/editar/"+nombrePrograma+'/'+idPrograma}><BtnBgIcon icon = <MdSchool size="75px"/> texto="Datos del programa"/></Link>
                <Link to={"/listadoPlanes/"+nombrePrograma+'/'+idPrograma}><BtnBgIcon icon= <MdLibraryBooks  size="70px" /> texto="Planes de estudio"/></Link>
                <Link to={"/directoresPrograma/"+nombrePrograma+'/'+idPrograma}><BtnBgIcon icon= <MdSupervisorAccount size="75px"/> texto="Directores"/></Link>
            </div>
        </div>
        </>
    )
    
}

export function InicioPrin(){
    const { usuario } = useContext(AuthContext);
    const idUsuario = usuario.idUsuario;
    const usuRol = usuario.usu_rol;

    if(usuRol === "Decano"){ return(<InDecano idUsuario={idUsuario}/>)}
    else{ return(<InOtros idUsuario={idUsuario} rol={usuRol}/> )}
}

export function InDecano({idUsuario}){
    const [search, setSearch] = useState("");
    const [nombreFacultad, setFacultad] = useState("");
    const [programas, setProgramas] = useState([]);

    useEffect(() => {
        axios.get(`/api/listaProgramas/${idUsuario}`)
            .then(response => {
                setProgramas(response.data) ;
            })
            .catch(error => {
                console.error('Error buscando datos del usuario:', error);
            });
            axios.get(`/api/decano/${idUsuario}`)
            .then(response => {
                const data = response.data;
                setFacultad(data[0].fac_nombre)
            })
            .catch(error => {
                console.error('Error buscando datos del decano:', error);
            });
    }, []);    

    const busqueda = (e) =>{
        setSearch(e.target.value);
    }
        
    let resultBusqueda = [];
    if (!search) {
        resultBusqueda = programas;
    } else {
        resultBusqueda = programas.filter((dato) =>
            dato.pro_nombre.toLowerCase().includes(search.toLowerCase())
        );
    }

    return(
        <>
            <HeaderPriv/>
            <div className="contBread">
                    <PagActual pagina="Menú principal"/> 
            </div>
            <TitulLine titulo="Programas académicos" subt={"Facultad "+nombreFacultad} />
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
                    {resultBusqueda.map((item) => ( 
                        <Link to={"/InicioProg/"+item.pro_nombre.replace(/ /g, '-')+'/'+item.idPrograma} key={item.idPrograma}>
                        <BtnBgSimple  key={item.idPrograma} texto={item.pro_nombre}/></Link>))}
                </div>
            </div>
        </>
    )
    
}

export function InOtros({idUsuario, rol}){
    const [nombreFacultad, setFacultad] = useState([]);
    const [nombrePrograma, setNombrePrograma] = useState([]);
    const [idPrograma, setIdPrograma] = useState([]);

    useEffect(() => {
        if(rol === "Director"){
            axios.get(`/api/findDirector/${idUsuario}`)
            .then(response => {
                const dataArray = response.data;
                if (dataArray.length > 0) {
                    const data = dataArray[0]; 
                    setIdPrograma(data.idPrograma);
                    setNombrePrograma(data.pro_nombre);
                    setFacultad(data.fac_nombre);
                }
            })
            .catch(error => {
                console.error('Error buscando datos del director:', error);
            });
        }
    }, [rol]);    

    return(
        <>
            <HeaderPriv/>
            <div className="contBread">
                <PagActual pagina="Menú principal"/> 
            </div>
            {rol === "Director" ? <TitulLine titulo={nombrePrograma} subt={"Facultad "+nombreFacultad}/>
            : <TitulLine titulo="Configuración" subt="Elementos del sistema"/> }
            <div className="contAdm">
                <div className="infoAdmi">
                    {rol === "Director" ? <>
                    <Link to={"/DatosPrograma/editar/"+nombrePrograma+'/'+idPrograma}><BtnBgIcon icon = <MdSchool size="75px"/> texto="Datos del programa"/></Link>
                    <Link to={"/listadoPlanes/"+nombrePrograma+'/'+idPrograma}><BtnBgIcon icon= <MdLibraryBooks  size="70px" /> texto="Planes de estudio"/></Link>
                    </>
                    : <>
                    <Link to={"/usuarios"}><BtnBgIcon icon= <MdSupervisorAccount size="75px"/> texto="Lista de usuarios"/></Link>
                    <Link to={""}><BtnBgIcon icon= <MdOutlineCorporateFare size="70px"/> texto="Facultades"/></Link>
                    <Link to={"/areasConocimiento"}><BtnBgIcon icon= <MdOutlineImportContacts size="70px"/> texto="Áreas del conocimiento"/></Link>
                    </>}
                </div>
            </div>
        </>
    )
    
}