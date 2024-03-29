import "./privateUser.css"
import { HeaderPriv } from "./Header";
import { Titul } from "./Titulo";
import { PagActual, PagAnterior } from "./Breadcrumbs"
import { TablaSimple } from "./Table"
import { InputMd, SelectMd, InputMdBlock } from "./CuadrosTexto"
import { Btnmin } from "./Button"
import { MensajeCorrecto } from "./Mensaje";
import { Link, useParams, useNavigate  } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import axios from "axios";

export function DataProg({rol}){
    const params = useParams();
    const navigate = useNavigate();
    const accion = params.accion;
    const nombrePrograma = params.nombre;
    const idPrograma = params.id;
    var fechaRegistro = "";
    var fechaCalidad = "";
    
    const [showMessage, setShowMessage] = useState(false);

    const jornada = [
        { id: 1, nombre: "Diurna" },
        { id: 2, nombre: "Nocturna" },
    ]

    const sede = [
        { id: 1, nombre: "Calle 100" },
        { id: 2, nombre: "Campus Nueva Granada" },
        { id: 3, nombre: "Calle 100 - Campus " },
    ]

    const modalidad = [
        { id: 1, nombre: "A distancia" },
        { id: 2, nombre: "Presencial" },
    ]

    var [valuesProgram, setValuesProgram] = useState({
        nombreP: "",
        codigoP: "",
        modalidadP: "",
        jornadaP:"",
        regisCal: "",
        regisfecha: "",
        acreditacion: "",
        acreditafecha: "",
    });

    const handleInputChangeD = (e) => {
        const { name, value } = e.target;
        setValuesProgram({
            ...valuesProgram,
            [name]: value,
        });
    };

    function ajustarFecha(fecha) {
        const ajuste =  new Date(fecha);
        const fechaModificada = `${ajuste.getFullYear()}-${(ajuste.getMonth() + 1).toString().padStart(2, '0')}-${ajuste.getDate().toString().padStart(2, '0')}`;
        return fechaModificada;
    }
    
    useEffect(() => {
        if (accion === "editar") {
            axios.get(`api/programa/${idPrograma}`)
            .then(response => {
            const dataArray = response.data; // La respuesta es un arreglo
            if (dataArray.length > 0) {
                const data = dataArray[0]; // Obtenemos el primer objeto del arreglo
            if(data.pro_fechaReg){
                fechaRegistro = ajustarFecha(data.pro_fechaReg);
            }
            if(data.pro_fechaCalidad){
                fechaCalidad = ajustarFecha(data.pro_fechaCalidad);
            }
            setValuesProgram({
                ...valuesProgram,
                nombreP: data.pro_nombre,
                codigoP: data.pro_SNIES,
                modalidadP: data.pro_modalidad,
                jornadaP:data.pro_jornada,
                semestresP: data.pro_semestres,
                regisCal: data.pro_regAcreditacion,
                regisfecha: fechaRegistro,
                acreditacion:data.pro_altaCalidad,
                acreditafecha:fechaCalidad,
            });
            } else {
            console.log('No se encontraron datos para el programa con ese id.');
            }
            })
            .catch(error => {
        console.error('Error fetching programa details:', error);
        });}
        console.log("carga");
    }, [accion, idPrograma]);

    const handleFormD = async (e) =>{
        e.preventDefault();
        if(accion === "editar"){
            try {
                const response = await axios.put(`/api/programa/${idPrograma}`, { valuesProgram });
                setShowMessage(true);
            } catch (error) {
                console.error('Error al actualizar el programa:', error);
            }
        }
        else {
            try {
                const response = await axios.post(`/api/programa`, { valuesProgram });
                const { idPrograma, pro_nombre } = response.data;
                setShowMessage(true);
                navigate(`/directoresPrograma/${pro_nombre.replace(/ /g, '-')}/${idPrograma}/crear`);
            } catch (error) {
                console.error('Error al crear el programa:', error);
            }
        }
    };

    const closeModal = async (e) => {
        setShowMessage(false);
    }
    
    return(
        <>
        <HeaderPriv/>
        
        <div className="contBread">
                <PagAnterior ruta="/" pagina="Menú principal"/>
                {rol && accion === "editar"  ? <PagAnterior ruta={"/InicioProg/"+nombrePrograma+'/'+idPrograma} pagina="Programa"/> : ""}
                <PagActual pagina="Datos del programa"/>
            </div>
        
        {accion === "editar" ? <Titul titulo="Datos del progama" subt={nombrePrograma.replace(/-/g,' ')} /> 
        : <Titul titulo="Datos del programa" subt="Nuevo programa" />}
        
        
        <div className="contAdm">
            <form onSubmit={handleFormD} >
                <TablaSimple titulo="Información basica" 
                    contenido = {<>
                        {accion === "editar" ? <InputMdBlock name="nombreP" texto = "Nombre:"  info={valuesProgram.nombreP} />
                        : <InputMd texto = "Nombre:" name="nombreP" info={valuesProgram.nombreP} onChange={handleInputChangeD} required = {"required"}/>}
                        
                        
                        {accion === "editar" ? <InputMdBlock name="codigoP" texto = "SNIES:" tipo="number" info={valuesProgram.codigoP} />
                        : <InputMd texto = "SNIES:" tipo="number" name="codigoP" info={valuesProgram.codigoP} onChange={handleInputChangeD} required = {"required"}/>}
                        
                        <SelectMd texto = "Jornada:" name="jornadaP" data={jornada} selectedValue={valuesProgram.jornadaP} onChange={handleInputChangeD} required={"required"}/>
                        <SelectMd texto = "Modalidad:" name="modalidadP" data={modalidad} selectedValue={valuesProgram.modalidadP} onChange={handleInputChangeD} required = {"required"}/>
                        <InputMd texto = "Semestres:" tipo="number" name="semestresP" info={valuesProgram.semestresP} onChange={handleInputChangeD} required = {"required"}/>
                    </>
                    }
                />
                <TablaSimple titulo="Registro calificado"
                    contenido = {<>
                        <InputMd texto = "Resolución:" name="regisCal" info={valuesProgram.regisCal} onChange={handleInputChangeD} required = {"required"}/>
                        <InputMd texto = "Fecha:" tipo="date" name="regisfecha" info={valuesProgram.regisfecha} onChange={handleInputChangeD} required = {"required"}/>
                    </>
                    }
                />
                <TablaSimple titulo="Acreditación alta calidad"
                    contenido = {<>
                        <InputMd texto = "Resolución:" name="acreditacion" info={valuesProgram.acreditacion}  onChange={handleInputChangeD}/>
                        <InputMd texto = "Fecha:" tipo="date" name="acreditafecha" info={valuesProgram.acreditafecha}  onChange={handleInputChangeD}/>
                    </>
                }
                />
                <div className="dobleBtn">
                    {rol && accion === "editar" ? <Link to={"/InicioProg/"+nombrePrograma+'/'+idPrograma}><Btnmin texto="Atrás" color="#707070"/></Link>
                        : <Link to='/'><Btnmin texto="Atrás" color="#707070"/></Link>}
                        <Btnmin texto="Guardar" color="#182B57" tipo="submit"/>
                </div>
            </form>
        </div>
        {showMessage && createPortal(
        <MensajeCorrecto onClose={closeModal} />,
        document.body
        )}
        </>
    )
}