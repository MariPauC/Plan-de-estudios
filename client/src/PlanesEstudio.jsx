import "./privateUser.css"
import { HeaderPriv } from "./Header"
import { Titul } from "./Titulo";
import { Tabla }from "./Table"
import { BtnMdIcon,Btnmin } from "./Button"
import { PagAnterior, PagActual} from "./Breadcrumbs"
import { MdAddCircleOutline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from './AuthContext';
import axios from "axios";


export function PlanEst({rol}){ 
    const params = useParams();
    const nombrePrograma = params.nombre;
    const idPrograma = params.id;
    
    const { usuario } = useContext(AuthContext);
    const idUsuario = usuario.idUsuario;
    const [planesDesarrollo, setPlanesDesarrollo] = useState([]);
    const [planesActual, setPlanesActual] = useState([]);
    const [planesAntiguo, setPlanesAntiguo] = useState([]);

    useEffect(() => {
        axios.get(`/api/planesEstudios/${idPrograma}/desa`)
        .then(response => {
            const data = response.data;
            setPlanesDesarrollo(data);
        })
        .catch(error => {
            console.error('Error buscando planes en desarrollo:', error);
            
        });
        
        axios.get(`/api/planesEstudios/${idPrograma}/actual`)
                .then(response => {
                    const data = response.data;
                    setPlanesActual(data);
                })
                .catch(error => {
                    console.error('Error buscando planes en actuales:', error);
                });
        
        axios.get(`/api/planesEstudios/${idPrograma}/antiguo`)
        .then(response => {
            const data = response.data;
            setPlanesAntiguo(data);
        })
        .catch(error => {
            console.error('Error buscando planes antiguos:', error);
        });
    }, []);
    
    const createPlan = async () => {
        try {
            const responsePlan = await axios.post(`/api/crearPlan/${idPrograma}`, { idUsuario });
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return(
        <>
        <HeaderPriv/>
        <div className="contBread">
            <PagAnterior ruta="/" pagina="Menú principal"/>
            {rol ? <PagAnterior ruta={"/InicioProg/"+nombrePrograma+'/'+idPrograma} pagina="Programa"/> : ""}
            <PagActual pagina="Planes de estudio"/>
        </div>
        <Titul titulo="Planes de estudio" subt={nombrePrograma.replace(/-/g,' ')} />
        <div className="contAdm">
            <h3 className="ttlAdmi">En desarrollo</h3>
            {planesDesarrollo.length > 0 ? <Tabla data= {planesDesarrollo} progId={idPrograma} progNombre={nombrePrograma} estado="Modificado por" accion="Editar"/> 
                        : <div className="btnPlace">
                            <Link to={"/datosPlan/"+nombrePrograma+'/'+idPrograma}>
                                <BtnMdIcon icon=<MdAddCircleOutline size="60px"/> texto="Crear plan" onClick={createPlan}/>
                            </Link>
                        </div>
            }
            <h3 className="ttlAdmi">Actual</h3>
            {planesActual.length > 0 ? <Tabla data= {planesActual} estado="Aprobado por" accion="Ver"/>
            : <div className="mnsPlan"><p>No hay ningún plan activo en este momento</p></div>}
            
            <h3 className="ttlAdmi">Versiones anteriores</h3>
            {planesAntiguo.length > 0 ? <Tabla data= {planesAntiguo} estado="Aprobado por" accion="Ver"/>
            : <div className="mnsPlan"><p>No hay ningún plan de estudios en esta categoria</p></div>}
            
            {rol ? <Link to={"/InicioProg/"+nombrePrograma+'/'+idPrograma}><Btnmin texto="Atrás" color="#707070"/></Link>
                : <Link to='/'><Btnmin texto="Atrás" color="#707070"/></Link>}
        </div>
        </>
    )
}

