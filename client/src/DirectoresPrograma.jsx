import "./privateUser.css"
import { HeaderPriv } from "./Header"
import { Titul } from "./Titulo";
import { AutoTabla }from "./Table"
import { TextMd } from "./CuadrosTexto"
import { Btnmin } from "./Button"
import { PagAnterior, PagActual} from "./Breadcrumbs"
import { DirectorModal } from "./Modal";
import { createPortal } from 'react-dom';
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


export function DirctProg(){ 
    const params = useParams();
    const nombrePrograma = params.nombre;
    const idPrograma = params.id;
    const accion = params.accion;
    const [directores, setDirectores] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
    const titulos = ["Nombres", "Apellidos","Correo", "Sede"];
    
    useEffect(() => {
        axios.get(`/api/listaDirectores/${idPrograma}`)
            .then(response => {
                setDirectores(response.data) ;
                console.log("cargar");
            })
            .catch(error => {
                console.error('Error cargando directores:', error);
            });
    }, []);

    const cargarDirectores = async () =>{
        try {
            const response = await axios.get(`/api/listaDirectores/${idPrograma}`);
            setDirectores(response.data)
        } catch (error) {
            console.error('Error cargando directores:', error);
        }
    }

    return(
        <>
        <HeaderPriv/>
        <div className="contBread">
            <PagAnterior ruta="/" pagina="Menú principal"/>
            <PagAnterior ruta={"/InicioProg/"+nombrePrograma+'/'+idPrograma} pagina="Programa"/> 
            <PagActual pagina="Directores"/>
        </div>
        <Titul titulo="Directores del programa" subt={nombrePrograma.replace(/-/g,' ')} />
        
        
        <div className="contAdm">
            <div className="contBoton">
                <Btnmin texto="Añadir director" color="#979191" onClick={() => {setShowModal(true)}}/>
            </div>
            <AutoTabla titulos={titulos} data={directores} tipo="director" id={accion==="Crear" ? undefined : 'conbtn'}/>
            {accion !== "crear" && <Link to={"/InicioProg/"+nombrePrograma+'/'+idPrograma}><Btnmin texto="Atrás" color="#707070"/></Link>}
            
        </div>
        {showModal && createPortal(
        <DirectorModal onClose={() => {setShowModal(false);}} cargar={cargarDirectores} idPrograma={idPrograma}/>, 
        document.body
        )}
        </>
    )
}




