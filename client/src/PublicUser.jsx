import { HeaderPub } from './Header'
import { FootLg } from "./Footer"
import { MatPublica, MatTotal } from "./Materia"
import { Btnmin } from "./Button"
import { PagAnterior, PagActual} from "./Breadcrumbs"
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from './AuthContext';
import "./publicUser.css"
import axios from "axios";

export function PublicUser( {rol} ){
    const params = useParams();
    const idPlan = params.idPlan;
    const nombrePrograma = params.nombre;
    var fechaRegistro;
    var fechaCalidad;
    
    const [programa, setPrograma] = useState([]);
    const [areas, setAreas] = useState([]);
    const [materias, setMaterias] = useState([]);

    const { usuario } = useContext(AuthContext);

    const [escala, setEscala] = useState(1);
    const [margen, setMargen] = useState(4);

    function ajustarFecha(fecha) {
        const ajuste =  new Date(fecha);
        const fechaModificada = `${ajuste.getDate().toString().padStart(2, '0')}/${(ajuste.getMonth() + 1).toString().padStart(2, '0')}/${ajuste.getFullYear()}`;
        return fechaModificada;
    }
        
    const aumentarEscala = () => {
        const nuevaEscala = escala + 0.1;
        // Calcula el nuevo margen en porcentaje
        const nuevoMargen = (margen + 8) ;
        setEscala(nuevaEscala);
        setMargen(nuevoMargen);
    };
    const disminuirEscala = () => {
        const nuevaEscala = escala - 0.1;
        // Calcula el nuevo margen en porcentaje
        const nuevoMargen = (margen - 8) ;
        setEscala(nuevaEscala);
        setMargen(nuevoMargen);
    };


    useEffect(() => {
        axios.get(`/api/programaPlan/${idPlan}`)
        .then(response => {
            const data = response.data;
            setPrograma(data[0]);
        })
        .catch(error => {
            console.error('Error buscando planes en desarrollo:', error);
        });
        axios.get(`/api/areasPlan/${idPlan}`)
        .then(response => {
            const data = response.data;
            setAreas (data);
        })
        .catch(error => {
            console.error('Error buscando planes en desarrollo:', error);
            
        });
        axios.get(`/api/listaMaterias/${idPlan}`)
        .then(response => {
            setMaterias(response.data)
        })
        .catch(error => {
            console.error('Error buscando planes en desarrollo:', error);
        });
    }, [idPlan]);


    console.log(programa);
    if(programa.pro_fechaReg){
        fechaRegistro = ajustarFecha(programa.pro_fechaReg);
    }
    if(programa.pro_fechaCalidad){
        fechaCalidad = ajustarFecha(programa.pro_fechaCalidad);
    }

    const sumTtlCreditos = materias.reduce((acumulador, materias) => acumulador + parseInt(materias.mat_creditos), 0);
    const sumTtlHoras = materias.reduce((acumulador, materias) => acumulador + parseInt(materias.mat_horas), 0);
    
    const contSemestres = [];
    const contTotales = [];
    const contAreas = [];
    var materiasFiltradas =[];
    for (let i = 0; i < programa.pln_semestres; i++) {
        materiasFiltradas = materias.filter(materia => materia.mat_semestre === (i + 1))
        const sumCreditos = materiasFiltradas.reduce((acumulador, materiasFiltradas) => acumulador + parseInt(materiasFiltradas.mat_creditos), 0);
        const sumHoras = materiasFiltradas.reduce((acumulador, materiasFiltradas) => acumulador + parseInt(materiasFiltradas.mat_horas), 0);
        contSemestres.push(
            <div className='contSemestre' >
                <h3>SEMESTRE {i+1}</h3>
                {materiasFiltradas.map((item) => ( 
                    <MatPublica key={item.idMateria} data={item} /> 
                ))}
                
            </div>
        );
        
        contTotales.push(
            <div className='contSemestre' >
                <MatTotal horas={sumHoras} creditos={sumCreditos} />
            </div>
        );
    }

    for (let i = 0; i < areas.length; i++) {
        contAreas.push(
            <tr key={areas[i].idArea}>
                <td className='areColor' style={{backgroundColor:areas[i].are_color}}></td>
                <td>{areas[i].are_nombre}</td>
            </tr>
        );
    }

    return <>
        <HeaderPub programa={nombrePrograma.replace(/-/g,' ')}/>
        {usuario && 
            <>
            <div className="contBread">
                <PagAnterior ruta="/" pagina="Menú principal"/>
                {rol && <PagAnterior ruta={"/InicioProg/"+nombrePrograma+'/'+programa.idPrograma} pagina="Programa"/>}
                <PagAnterior ruta={"/listadoPlanes/"+nombrePrograma+'/'+programa.idPrograma}pagina="Planes de estudio"/>
                <PagActual pagina="Vista del plan"/>
            </div>
            <div className="contAdm" id="unqBtn">
                <div className="contBoton">
                    <Btnmin texto="Imprimir" color="#182B57" />
                </div>
            </div>
            </>
        }
        <div className="contTitulo">
            <p>FACULTAD DE {"INGENIERIA"}</p>
            <p>RESOLUCIÓN DE REGISTRO CALIFICADO {programa.pro_regAcreditacion} DE {fechaRegistro}</p>
            {programa.pro_altaCalidad && <p>RESOLUCIÓN DE ACREDITADO DE ALTA CALIDAD {programa.pro_altaCalidad} DE {fechaCalidad}</p>}
            <p>CÓDIGO SINIES {programa.pro_SNIES}</p>
        </div>
        <button onClick={aumentarEscala}>Aumentar Escala</button>
        <button onClick={disminuirEscala}>Disminuir Escala</button>
        
            <div className='contPlan' style={{ transform: `scaley(${escala})`, transformOrigin: 'left top '}} >
                <div style={{ transform: `scalex(${escala})`, transformOrigin: 'left top' }}>
                <div className='contMateriasPublicas'> 
                    {contSemestres}
                </div>
                <div className='contTotales'>
                    {contTotales}
                </div>
                </div>
            </div>
            <div className='contInfo' >
            <div className='contAreas'>
                <h3>Áreas del conocimiento</h3>
                <table className='tblAreas'>
                    <tbody>
                        {contAreas}
                    </tbody>
                </table>
            </div>
           
            <div className='totales'>
                <p> <b>Modalidad:</b> {programa.pro_modalidad}  </p>
                <p> <b>Jornada:</b> {programa.pro_jornada}  </p>
                <p> <b>Total créditos:</b> {sumTtlCreditos}  </p>
                <p> <b>Total horas:</b> {sumTtlHoras}  </p>
                <p> <b>Total materias:</b> {materias.length}</p>
            </div>
        </div>
        
        <FootLg/>
    </>
}

