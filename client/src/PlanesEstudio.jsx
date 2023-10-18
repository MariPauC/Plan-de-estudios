import "./privateUser.css"
import { HeaderPriv } from "./Header"
import { Titul } from "./Titulo";
import { Tabla }from "./Table"
import { BtnMdIcon,Btnmin } from "./Button"
import { PagAnterior, PagActual} from "./Breadcrumbs"
import { MdAddCircleOutline } from "react-icons/md";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from './AuthContext';
import axios from "axios";


export function PlanEst({rol}){ 
    const navigate = useNavigate();
    const params = useParams();
    const nombrePrograma = params.nombre;
    const idPrograma = params.id;
    
    const { usuario } = useContext(AuthContext);
    const idUsuario = usuario.idUsuario;
    const [numSemestre, setNumSemestres] = useState(1)
    const [planesDesarrollo, setPlanesDesarrollo] = useState([]);
    const [planesActual, setPlanesActual] = useState([]);
    const [planesAntiguo, setPlanesAntiguo] = useState([]);

    useEffect(() => {
        axios.get(`/api/estadoPlan/${idPrograma}/desa`)
        .then(response => {
            const data = response.data;
            setPlanesDesarrollo(data);
        })
        .catch(error => {
            console.error('Error buscando planes en desarrollo:', error);
            
        });
        
        axios.get(`/api/estadoPlan/${idPrograma}/actual`)
                .then(response => {
                    const data = response.data;
                    setPlanesActual(data);
                })
                .catch(error => {
                    console.error('Error buscando planes en actuales:', error);
                });
        axios.get(`/api/semestresProg/${idPrograma}`)
        .then(response => {
            const data = response.data;
            setNumSemestres (data.pro_semestres);
        })
        .catch(error => {
            console.error('Error buscando numero de semestres:', error);
        });
        axios.get(`/api/estadoPlan/${idPrograma}/antiguo`)
        .then(response => {
            const data = response.data;
            setPlanesAntiguo(data);
        })
        .catch(error => {
            console.error('Error buscando planes antiguos:', error);
        });
    }, []);
    
    const createPlan = () => {
        try {
            const responsePlan = axios.post(`/api/crearPlan/${idPrograma}`, { idUsuario, numSemestre });
            navigate(`/datosPlan/${nombrePrograma}/${idPrograma}`);
        } catch (error) {
            console.error('Error creando plan:', error);
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
                            <BtnMdIcon icon=<MdAddCircleOutline size="60px"/> texto="Crear plan" onClick={createPlan}/>
                        </div>
            }
            <h3 className="ttlAdmi">Actual</h3>
            {planesActual.length > 0 ? <Tabla data= {planesActual} progId={idPrograma} progNombre={nombrePrograma} estado="Aprobado por" accion="Ver"/>
            : <div className="mnsPlan"><p>No hay ningún plan activo en este momento</p></div>}
            
            <h3 className="ttlAdmi">Versiones anteriores</h3>
            {planesAntiguo.length > 0 ? <Tabla data= {planesAntiguo} progId={idPrograma} progNombre={nombrePrograma} estado="Aprobado por" accion="Ver"/>
            : <div className="mnsPlan"><p>No hay ningún plan de estudios en esta categoria</p></div>}
            
            {rol ? <Link to={"/InicioProg/"+nombrePrograma+'/'+idPrograma}><Btnmin texto="Atrás" color="#707070"/></Link>
                : <Link to='/'><Btnmin texto="Atrás" color="#707070"/></Link>}
        </div>
        </>
    )
}

