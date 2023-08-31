import "./modal.css"
import { MdOutlineCancel } from "react-icons/md";
import { InputSh, SelectSh, TextSh  } from "./CuadrosTexto";
import { Btnmin } from "./Button";
import { TablaMat } from "./Table"
import { MensajeCorrecto } from "./Mensaje";
import { useState, useEffect, useContext } from "react";
import { createPortal } from 'react-dom';
import { AuthContext } from './AuthContext';
import axios from "axios";

export function MatPubModal({ onClose, nm, cl, hr, cds, cdg }){
    return (
        <div className="modal">
            <div className="contModal">
                <div className="ttlModal">
                    <h3>Semestre 3</h3>
                    <div> 
                        <p>Horas: { hr }</p>
                        <hr className="lateral"/>
                        <p>Créditos: { cds }</p>
                    </div>
                </div>
                <div className="nmModal" style={{backgroundColor: cl}}>
                    <h1>{nm}</h1>
                    <p>{ cdg }</p>
                </div>
                <div className="infModal">
                    <div>
                        <h4>Área del conocimiento:</h4>
                        <p> wedwqertfasdewr</p>
                    </div>
                    <div>
                        <h4>Tipo asignatura:</h4>
                        <p> wqerfsewdqavreav </p>
                    </div>
                    <div>
                        <h4>Prerequisito:</h4>
                        <p> 2sdasdddfgdf </p>
                    </div>
                    <div>
                        <h4>Co-requisito:</h4>
                        <p> ryresvtybhdfgvsec </p>
                    </div>
                    <div id="resumen">
                        <h4>Resumen:</h4>
                        <p> ryrdsfzaxxsdcfv sd asdasces vtybhdfgvsec ryrdsfzaxxsdcfv sd asdasces vtybhdfgvsecryrdsfzaxxsdcfv sd asdasces vtybhdfgvsecryrdsfzaxxsdcfv sd asdasces vtybhdfgvsec </p>
                    </div>
                </div>
                <button className="btnModal" style={{backgroundColor:cl}} 
                    onMouseOver={ e => e.target.style.backgroundColor = "#E7E7E7" }
                    onMouseLeave={ e => e.target.style.backgroundColor = cl }
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export function MatPrivModal({ onClose, idMateria, idPlan, numSemestres, accion, cargar, materias }){
    const [showMessage, setShowMessage] = useState(false);
    const [idPlanEstudios, setIdPlanEstudios] = useState(idPlan);
    const [prerequisitos, setPrerequisitos] = useState([]);
    const [correquisitos, setCorrequisitos] = useState([]);
    const [valuesMateria, setValuesMateria] = useState({
        nombre: "",
        codigo: "",
        semestre: "",
        horas: "",
        tipo: "",
        creditos: "",
        descripcion: "",
        area: "",
    });

    const { usuario } = useContext(AuthContext);
    const idUsuario = usuario.idUsuario;

    const semestres = [];
    const listadoPre = materias.map((materia) => ({ id: materia.idMateria, nombre: materia.mat_nombre }));;
    const listadoCo = materias.map((materia) => ({ id: materia.idMateria, nombre: materia.mat_nombre }));;
    var tablaPre = []
    var tablaCo= [];

    for (let i = 1; i <= numSemestres; i++) {
    semestres.push({ id: i, nombre: i });
    }

    const tipoAsignatura = [
        { id: 1, nombre: "Teórica" },
        { id: 2, nombre: "Práctica" },
        { id: 3, nombre: "Teórico-Práctica" },
    ]
    const area = [
        { id: 1, nombre: "Ciencias basicas" },
        { id: 2, nombre: "Ciencias de la ingeniería" },
        { id: 3, nombre: "Ingeniería aplicada" },
        { id: 4, nombre: "Economico administrativa" },
        { id: 5, nombre: "Socio-Humanistica" },
        { id: 6, nombre: "Complementaria" },
    ]

    const prueba = [
        { id: 1, nombre: "jeje" },
        { id: 2, nombre: "de" },

    ]
    const prueba2 = [
        { id: 1, nombre: "jeje" },
        { id: 2, nombre: "de" },

    ]

   
    
    useEffect(() => {
        if (accion === "editar") {
            axios.get(`api/materia/${idMateria}`)
            .then(response => {
            const dataArray = response.data; // La respuesta es un arreglo
            if (dataArray.length > 0) {
                const materia = dataArray[0]; // Obtenemos el primer objeto del arreglo
                setValuesMateria({
                    nombre: materia.mat_nombre,
                    codigo: materia.mat_codigo,
                    horas: materia.mat_horas,
                    semestre:  materia.mat_semestre,
                    tipo:  materia.mat_tipo,
                    creditos:  materia.mat_creditos,
                    descripcion:  materia.mat_descripcion,
                    area: materia.area_id,
                });
                setIdPlanEstudios(materia.plan_id)
                
        } 
    })
    .catch(error => {
        console.error('Error fetching materia details:', error);
    });}}, [accion]);
    
    const closeModal = (e) => {
        setShowMessage(false);
        onClose(cargar);
        onClose(onClose);
    };

    const handleInputChangeM = (e) => {
        const { name, value } = e.target;
        setValuesMateria({
            ...valuesMateria,
            [name]: value,
        });
    };

    const handleSelectPre = (e) => {
        const { value } = e.target;
        console.log(value);
    };

    const handleSelectCo = (e) => {
        const { value } = e.target;
        setCorrequisitos(correquisitos.concat(value))
        
        tablaCo = listadoCo.filter((materia) => correquisitos.includes(materia.id));

        
        
    };

    const handleFormM = async (e) =>{
        e.preventDefault();
        if(accion === "editar"){
            try {
                const response = await axios.put(`/api/materia/${idMateria}`, { valuesMateria });
                console.log('Materia actualizada con éxito');
                setShowMessage(true);
            } catch (error) {
                console.error('Error al actualizar la materia:', error);
            }
        }
        else{
            try {
                const response = await axios.post(`/api/materia/${idPlanEstudios}`, { valuesMateria });
                console.log('Materia creada con éxito');
                setShowMessage(true);
            } catch (error) {
                console.error('Error al crear la materia:', error);
            }
        }
        try {
            const response = await axios.put(`/api/modificarPlan/${idPlanEstudios}`, { idUsuario });
            console.log('Plan actualizado con éxito');
        } catch (error) {
            console.error('Error al actualizar el plan:', error);
        }
    };

    const deleteMateria = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.delete(`/api/materia/${idMateria}`);
            console.log('Materia eliminada con éxito');
        } catch (error) {
            console.error('Error al actualizar el plan:', error);
        }
        onClose(cargar);
        onClose(onClose);
    }
    
    return (
        <>
        <div className="modal" >
            {console.log(correquisitos)}
            {console.log("datosTabla"+tablaCo)}
        </div>
        <div className="contModal" id="modalPrivado">
            <div className="ttlModal">
                <h2>Datos de la materia</h2>
                <MdOutlineCancel className="btnClose" style={{cursor:"pointer"}} size="30px" onClick={onClose}/>
            </div>
            <form onSubmit={handleFormM}>
                <div className="infModalPriv">
                    <InputSh texto = "Nombre:" name="nombre" info={valuesMateria.nombre} onChange={handleInputChangeM} required = {"required"}/>
                    <InputSh texto = "Código:" name="codigo" info={valuesMateria.codigo} onChange={handleInputChangeM} tipo="number" required = {"required"}/>
                    <SelectSh texto = "Tipo asignatura:" name="tipo" data={tipoAsignatura} selectedValue={valuesMateria.tipo} onChange={handleInputChangeM} required = {"required"}/>
                    <SelectSh texto = "Semestre:" name="semestre" data={semestres} selectedValue={valuesMateria.semestre} onChange={handleInputChangeM} required = {"required"}/>
                    <InputSh texto = "Créditos:" name="creditos" info={valuesMateria.creditos} onChange={handleInputChangeM} tipo="number" required = {"required"}/>
                    <InputSh texto = "Horas:" name="horas" info={valuesMateria.horas} onChange={handleInputChangeM} tipo="number" required = {"required"}/>
                    <SelectSh valueid={true} texto = "Prerequisito:"  name="pre" data={listadoPre} onChange={handleSelectPre} />
                    <SelectSh valueid={true} texto = "Correquisito:"  name="co" data={listadoCo} onChange={handleSelectCo}/>
                    <TablaMat data={prueba}/>
                    <TablaMat data={tablaCo}/>
                    <SelectSh valueid={true} texto = "Área conocimientos:" id="big" name="area" data={area} selectedValue={valuesMateria.area} onChange={handleInputChangeM} required = {"required"}/>
                    <TextSh texto = "Descripción:" id="big" row="3" name="descripcion" info={valuesMateria.descripcion} onChange={handleInputChangeM} required = {"required"}/>
                    <div className="dobleBtnModal">
                        {accion === "editar" ? <Btnmin texto="Eliminar" tipo="button" color="#BE0416" onClick={deleteMateria}/> 
                        : <Btnmin texto="Cancelar" tipo="button" color="#BE0416" onClick={onClose}/> }
                    <Btnmin texto="Guardar" color="#182B57" tipo="submit"/>
                    </div>
                </div>
            </form>
        </div>
        
        {showMessage && createPortal(
        <MensajeCorrecto onClose={closeModal} />,
        document.body
        )}
        </>
    );
};