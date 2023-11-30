import { HeaderPub } from './Header'
import { FootLg } from "./Footer"
import { MatPublica, MatTotal } from "./Materia"
import { Btnmin } from "./Button"
import { PagAnterior, PagActual} from "./Breadcrumbs"
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from './AuthContext';
import { MdArrowBackIos, MdArrowForwardIos, MdOutlineImageNotSupported } from "react-icons/md";
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
    const [decanos, setDecanos] = useState([]);
    const [directores, setDirectores] = useState([]);

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
            console.error('Error buscando información del programa:', error);
        });
        axios.get(`/api/areasPlan/${idPlan}`)
        .then(response => {
            const data = response.data;
            setAreas (data);
        })
        .catch(error => {
            console.error('Error buscando areas del plan:', error);
            
        });
        axios.get(`/api/listaMaterias/${idPlan}`)
        .then(response => {
            setMaterias(response.data)
        })
        .catch(error => {
            console.error('Error buscando lista de materias:', error);
        });
        axios.get(`api/firmasDecanos/${idPlan}`)
            .then(response => {
                setDecanos(response.data); 
            })
            .catch(error => {
                console.error('Error buscando firmas decanos:', error);
            });
        axios.get(`api/firmasDirectores/${idPlan}`)
        .then(response => {
            setDirectores(response.data); 
            console.log(directores);
        })
        .catch(error => {
            console.error('Error buscando firmas directores:', error);
        });
    }, [idPlan]);

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
                <h3 aria-label={`Semestre ${i + 1}`}  tabindex="0">SEMESTRE {i+1}</h3>
                {materiasFiltradas.map((item) => ( 
                    <MatPublica key={item.idMateria} data={item}  /> 
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

    const handleScroll = (direction) => {
        const contPlan = document.querySelector('.contPlan');
        const step = 320; // Puedes ajustar esto según tus necesidades
    
        if (direction === 'left') {
            contPlan.scrollTo({
                left: contPlan.scrollLeft - step,
                behavior: 'smooth',
        });
        } else {
            contPlan.scrollTo({
                left: contPlan.scrollLeft + step,
                behavior: 'smooth',
        });
        }
    };
    
    const imprimir = async () => {
        // Cambiar a la hoja de estilo de impresión
        const link = document.createElement('link');
        link.href = './publicUserDownload.css';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        document.head.appendChild(link);
        
        // Esperar a que se carguen los estilos antes de imprimir
        await new Promise((resolve) => {
            link.onload = resolve;
            document.head.appendChild(link);
        });
        
        // Imprimir la página
        window.print();
        
        // Remover la hoja de estilo de impresión después de imprimir
        document.head.removeChild(link);
    };

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
            {/*<div className="contAdm" id="unqBtn">
                <div className="contBoton">
                    <Btnmin texto="Imprimir" color="#182B57" onClick={imprimir}/>
                </div>
            </div>*/}
            </>
        }
        <div className="contTitulo" role="text" tabIndex="0" >
            <h4 role="text">FACULTAD DE {"INGENIERIA"}</h4>
            <h4 role="text">RESOLUCIÓN DE REGISTRO CALIFICADO {programa.pro_regAcreditacion} DE {fechaRegistro}</h4>
            {programa.pro_altaCalidad && <h4 role="text">RESOLUCIÓN DE ACREDITADO DE ALTA CALIDAD {programa.pro_altaCalidad} DE {fechaCalidad}</h4>}
            <h4 role="text">CÓDIGO SINIES {programa.pro_SNIES}</h4>
        </div>
        {/*<button onClick={aumentarEscala}>Aumentar Escala</button>
        <button onClick={disminuirEscala}>Disminuir Escala</button>*/}
        <div className='planes'>
            <button className='iconArrow' title="Deslizar a la izquierda" onClick={() => handleScroll('left')}><MdArrowBackIos /></button>
            <div className='contPlan' role="button" style={{ transform: `scaley(${escala})`, transformOrigin: 'left top '}} >
                <div style={{ transform: `scalex(${escala})`, transformOrigin: 'left top' }}>
                <div className='contMateriasPublicas' tabIndex={0}> 
                    {contSemestres}
                </div>
                <div className='contTotales' tabIndex={0}>
                    {contTotales}
                </div>
                </div>
            </div>
            <button className='iconArrow' role="button" title="Deslizar a la derecha" onClick={() => handleScroll('right')}><MdArrowForwardIos/></button>
        </div>
        <div className='contInfo' id="detalles">
            <div className='contAreas' tabIndex="0">
                <h3>Áreas del conocimiento</h3>
                <table className='tblAreas'>
                    <tbody>
                        {contAreas}
                    </tbody>
                </table>
            </div>
            <div className='totales' tabIndex="0">
                <p> <b>Modalidad:</b> {programa.pro_modalidad}  </p>
                <p> <b>Jornada:</b> {programa.pro_jornada}  </p>
                <p> <b>Total créditos:</b> {sumTtlCreditos}  </p>
                <p> <b>Total horas:</b> {sumTtlHoras}  </p>
                <p> <b>Total materias:</b> {materias.length}</p>
            </div>
        </div>
        <div className='contInfo' tabindex="0" >
            <div className='contAreas'>
                <h3>Elaborado por</h3>
                {directores.map((item, index) => ( <FirmasPlan key={index} data={item} nombrePrograma={nombrePrograma} tipoUsu="Director" />))}
            </div>
            <div className='contAreas'>
                <h3>Revisado por</h3>
                {decanos.map((item, index) => ( <FirmasPlan key={index}  data={item} nombrePrograma={nombrePrograma} tipoUsu="Decano"/> ))}
            </div>
        </div>
        
        <FootLg/>
    </>
}

export function FirmasPlan({ data, nombrePrograma, tipoUsu }) {
    return (
      <div>
        {data.usu_firma ? (
          <div className="imgFirma">
            <Imagen archivoFirma={data.usu_firma} tipoUsu={tipoUsu} />
          </div>
        ) : (
          <div className="imgFirma">
            <MdOutlineImageNotSupported size="50px" />
          </div>
        )}
        <p>{data.usu_nombre} {data.usu_apellido}</p>
        {tipoUsu === "Director" && <p>Director programa de {nombrePrograma}, sede {data.fac_sede}</p>}
        {tipoUsu === "Decano" && <p>Decano facultad de {data.fac_nombre}, sede {data.fac_sede}</p>}
      </div>
    );
  }
function Imagen({ archivoFirma, tipoUsu }) {
    const baseUrl = "http://localhost:5000/uploads/"; // Cambia esto a la URL real de tu servidor
    const imageUrl = baseUrl + archivoFirma;

    return (
        <img className="foto" src={imageUrl} alt={"Firma del "+tipoUsu} />
    );
}