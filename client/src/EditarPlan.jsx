import "./privateUser.css"
import { HeaderPriv } from "./Header"
import { Titul } from "./Titulo";
import { PagAnterior, PagActual} from "./Breadcrumbs";
import { TextSh } from "./CuadrosTexto";
import { PanelTab } from "./PanelTab";
import { Btnmin, BtnminDis } from "./Button";
import { MatPrivModal } from "./Modal"
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from './AuthContext';
import { createPortal } from 'react-dom';
import axios from "axios";


export function EditarPlanEst({rol}){ 
    const params = useParams();
    const nombrePrograma = params.nombre;
    const idPrograma = params.id;
    const idPlan = params.idPlan;
    const navigate = useNavigate();

    const { usuario } = useContext(AuthContext);
    const idUsuario = usuario.idUsuario;

    const [numSemestre, setNumSemestres] = useState(1)
    const [showModal, setShowModal] = useState(false);
    const [comentarios, setComentarios] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [valueComment, setValueComment] = useState("");
    const [planesActual, setPlanesActual] = useState([]);



    useEffect(() => {
        axios.get(`/api/semestresProg/${idPrograma}`)
        .then(response => {
            const data = response.data;
            setNumSemestres (data.pro_semestres);
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

        cargarMaterias();
        cargarComentarios();

    }, [idPrograma]);

    const cargarComentarios = async () => {
        try {
            const response = await axios.get(`/api/listaComentarios/${idPlan}`);
            setComentarios(response.data);
        } catch (error) {
            console.error('Error cargando comentarios:', error);
        }
    };

    const cargarMaterias = async () =>{
        try {
            const response = await axios.get(`/api/listaMaterias/${idPlan}`);
            setMaterias(response.data)
            
        } catch (error) {
            
        }
    }
    
    const comentar = async (e) =>{
        e.preventDefault();
        if(valueComment){
            try {
                const response = await axios.post(`/api/comentar/${idPlan}`, { valueComment, idUsuario });
                setValueComment("");
                cargarComentarios();
                console.log('Comentario realizado con éxito');
            } catch (error) {
                console.error('Error al actualizar el programa:', error);
            }
        }
    };

    const validar = async (e) =>{
        e.preventDefault();
        var estado;
        
        console.log(planesActual);
        
        if(planesActual.length > 0){
            estado="Antiguo"
            try {
                const response = await axios.put(`/api/modificarPlan/${planesActual[0].idPlanEstudios}`, { estado });
                console.log('Plan actualizado con éxito');
            } catch (error) {
                console.error('Error al actualizar el plan:', error);
            }
            console.log("hay anterior");
            console.log(planesActual[0].idPlanEstudios);
        }
        estado="Actual"
        try {
            const response = await axios.put(`/api/modificarPlan/${idPlan}`, {idUsuario, estado });
            console.log('Plan actualizado con éxito');
        } catch (error) {
            console.error('Error al actualizar el plan:', error);
        }
        navigate(`/planesEstudios/${nombrePrograma}/${idPrograma}`)
    };

    function openModal() {
        setShowModal(true)
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
    }

    const closeModal = (e) => {
        setShowModal(false);
        cargarMaterias();
    };

    return(
        <>
        <HeaderPriv/>
        <div className="contBread">
            <PagAnterior ruta="/" pagina="Menú principal"/>
            {rol && <PagAnterior ruta={"/InicioProg/"+nombrePrograma+'/'+idPrograma}  pagina="Programa"/>}
            <PagAnterior ruta={"/PlanesEstudios/"+nombrePrograma+'/'+idPrograma}pagina="Planes de estudio"/>
            <PagActual pagina="Datos del plan"/>
        </div>
        <Titul titulo="Edición: Plan de estudios" subt={nombrePrograma.replace(/-/g,' ')}  />
        
        <div className="contAdm">
            <div className="contBoton">
                <Btnmin texto="Añadir materia" color="#182B57" onClick={openModal}/>
            </div>
            
            <PanelTab tam={numSemestre} materias={materias} cargar={cargarMaterias}/>

            {comentarios && comentarios.map((item) => <Comentario key={item.idComentario} data={item} />)}

            {rol ? <>
                <form className="contComent" onSubmit={comentar} >
                    <TextSh 
                        texto = "Comentario:" 
                        id="big" row="3" 
                        name="comentario" 
                        info={valueComment} 
                        onChange={e => setValueComment(e.target.value) }
                        cursor = "not-allowed"
                        readonly
                    />
                    <div className="contBoton">
                        <Btnmin texto="Comentar" id="mgnMN" tipo="submit" color="#707070"/>
                    </div>
                </form>
                <div className="dobleBtn">
                <Link to={'/planesEstudios/'+nombrePrograma+'/'+idPrograma}><Btnmin texto="Atrás" color="#707070"/></Link>
                { materias.length > 10 ? <Btnmin texto="Aprobar" color="#182B57" onClick={validar}/>
                : <BtnminDis texto="Aprobar" color="#182B57" />}
                
                </div>
                </>
                : <><Link to={'/planesEstudios/'+nombrePrograma+'/'+idPrograma}><Btnmin texto="Atrás" color="#707070"/></Link></>
            }
        </div>
        {showModal && createPortal(
        <MatPrivModal onClose={closeModal} cargar={cargarMaterias} accion="crear" idPlan={idPlan} numSemestres={numSemestre} materias={materias}/>,
        document.body
        )}
        </>
    )
}

export function Comentario ({ data }) {
    function ajustarFecha(fecha) {
        if(fecha){
            const ajuste =  new Date(fecha);
            const fechaModificada = `${ajuste.getFullYear()}-${(ajuste.getMonth() + 1).toString().padStart(2, '0')}-${ajuste.getDate().toString().padStart(2, '0')}`;
            return fechaModificada;
        }
        else{
            return "-";
        }
    }
    
    return (
        <div className="contComent">
                <h3 className="ttlComentario"> {data.usu_nombre + ' ' + data.usu_apellido  + ' | ' + ajustarFecha(data.com_fecha)}</h3>
                <p className="detalleCom">{data.com_detalle}</p>
        </div>
    );
};