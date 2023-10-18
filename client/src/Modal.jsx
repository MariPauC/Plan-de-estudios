import "./modal.css"
import { MdOutlineClose } from "react-icons/md";
import { InputSh, InputShBlock, SelectSh, TextSh } from "./CuadrosTexto";
import { Btnmin } from "./Button";
import { TablaMat } from "./Table"
import { MensajeCorrecto, MensajeEliminado } from "./Mensaje";
import { useState, useEffect, useContext } from "react";
import { createPortal } from 'react-dom';
import { ChromePicker } from 'react-color';
import { AuthContext } from './AuthContext';
import { MdSettingsBackupRestore } from "react-icons/md";
import axios from "axios";

export function MatPubModal({ onClose, idMateria, area, color}){
    const [valuesMateria, setValuesMateria] = useState({
        nombre: "",
        codigo: "",
        semestre: "",
        horas: "",
        tipo: "",
        creditos: "",
        descripcion: "",
    });
    useEffect(() => {
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
                });
            } 
        })
        .catch(error => {
            console.error('Error fetching materia details:', error);
        });}, []);
    
    
    return (
        <div className="modal">
            <div className="contModal">
                <div className="ttlModal">
                    <h3>Semestre { valuesMateria.semestre }</h3>
                    <div> 
                        <p>Horas: { valuesMateria.horas }</p>
                        <hr className="lateral"/>
                        <p>Créditos: { valuesMateria.creditos }</p>
                    </div>
                </div>
                <div className="nmModal" style={{backgroundColor: color}}>
                    <h1>{valuesMateria.nombre}</h1>
                    <p>{ valuesMateria.codigo }</p>
                </div>
                <div className="infModal" id="matPublica">
                    <div>
                        <h3>Área del conocimiento:</h3>
                        <p> {area}</p>
                    </div>
                    <hr className="lateral"/>
                    <div>
                        <h3>Tipo asignatura:</h3>
                        <p> {valuesMateria.tipo} </p>
                    </div>
                    <div>
                        <h3>Prerequisito:</h3>
                        <p> 2sdasdddfgdf </p>
                    </div>
                    <hr className="lateral"/>
                    <div>
                        <h3>Co-requisito:</h3>
                        <p> ryresvtybhdfgvsec </p>
                    </div>
                    
                    <div id="resumen">
                        <hr className="arriba"/>
                        <h3>Descripción:</h3>
                        <p> {valuesMateria.descripcion} </p>
                    </div>
                </div>
                <button className="btnModal" style={{backgroundColor:color}} 
                    onMouseOver={ e => e.target.style.backgroundColor = "#E7E7E7" }
                    onMouseLeave={ e => e.target.style.backgroundColor = color }
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
                setShowMessage(true);
            } catch (error) {
                console.error('Error al actualizar la materia:', error);
            }
        }
        else{
            try {
                const response = await axios.post(`/api/materia/${idPlanEstudios}`, { valuesMateria });
                setShowMessage(true);
            } catch (error) {
                console.error('Error al crear la materia:', error);
            }
        }
        try {
            const response = await axios.put(`/api/modificarPlan/${idPlanEstudios}`, { idUsuario });
        } catch (error) {
            console.error('Error al actualizar el plan:', error);
        }
    };

    const deleteMateria = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.delete(`/api/materia/${idMateria}`);
        } catch (error) {
            console.error('Error al actualizar el plan:', error);
        }
        onClose(cargar);
        onClose(onClose);
    }
    
    return (
        <>
        <div className="modal"></div>
        <div className="contModal" id="modalPrivado">
            <div className="ttlModal" id="ttlPrivado">
                <h2>Datos de la materia</h2>
                <MdOutlineClose className="btnClose" style={{cursor:"pointer"}} size="30px" onClick={onClose}/>
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

export function UsuarioModal({ onClose, idUsuario, cargar }){
    const { registrar } = useContext(AuthContext);
    const [showMessage, setShowMessage] = useState(false);
    const [showMessageErr, setShowMessageErr] = useState(false);

    var [valuesUsu, setvaluesUsu] = useState({
        nombre: "",
        apellido: "",
        correo:"",
        documento: "",
        contrasena: "",
        rol:"",
    });

    const rol = [
        { id: "Decano", nombre: "Decano" },
        { id: "Director", nombre: "Director" },
        { id: "Administrador", nombre: "Administrador" },
    ]
    
    useEffect(() => {
        if (idUsuario) {
            axios.get(`/api/usuario/${idUsuario}`)
            .then(response => {
                const data = response.data;
                setvaluesUsu({
                    ...valuesUsu,
                    nombre: data[0].usu_nombre,
                    apellido: data[0].usu_apellido,
                    correo: data[0].usu_correo, 
                    documento: data[0].usu_documento,
                    rol: data[0].usu_rol, 
                });
            })
            .catch(error => {
                console.error('Error buscando datos del usuario:', error);
            });
        }
    }, [idUsuario]);

    const handleInputChangeCon = (e) => {
        const { name, value } = e.target;
        setvaluesUsu({
            ...valuesUsu,
            [name]: value,
        });
    };

    const handleSubmit= async (event) => {
        event.preventDefault();
        if(idUsuario){
            const formData = new FormData();
            formData.append('nombre', valuesUsu.nombre);
            formData.append('apellido', valuesUsu.apellido);
            formData.append('documento', valuesUsu.documento);
            formData.append('rol', valuesUsu.rol);
            try {
                const response = await axios.put(`/api/usuario/${idUsuario}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }});
                setShowMessage(true);
            } catch (error) {
                console.error('Error al actualizar el usuario:', error);
            }
        }
        else{
            registrar(valuesUsu.nombre, valuesUsu.apellido,valuesUsu.correo, valuesUsu.contrasena, valuesUsu.documento, valuesUsu.rol);
            setShowMessage(true);
        }
    };

    const closeModal = (e) => {
        if(showMessage){
            setShowMessage(false);
        }
        if(showMessageErr){
            setShowMessageErr(false);
        }
        onClose(cargar);
        onClose(onClose);
    };

    const deleteUsu = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.delete(`/api/usuario/${idUsuario}`);
            setShowMessageErr(true);
        } catch (error) {
            console.error('Error eliminar al usuario:', error);
        }
    }
    
    return (
        <>
        <div className="modal"></div>  
        <div className="contModal" >
            <div className="ttlModal" id="ttlPrivado">
                <h2>Datos de la materia</h2>
                <MdOutlineClose className="btnClose" style={{cursor:"pointer"}} size="30px" onClick={onClose}/>
            </div>

            <form onSubmit={handleSubmit}>
            <div className="infModalPriv">
                <InputSh texto = "Nombres:" name="nombre" info={valuesUsu.nombre} onChange={handleInputChangeCon} required = {"required"}/>
                <InputSh texto = "Apellidos:" name="apellido" info={valuesUsu.apellido} onChange={handleInputChangeCon} required = {"required"}/>
                {idUsuario ?<InputShBlock texto = "Correo:" tipo="email" name="correo" info={valuesUsu.correo} onChange={handleInputChangeCon} required = {"required"}/>
                : <InputSh texto = "Correo:" tipo="email" name="correo" info={valuesUsu.correo} onChange={handleInputChangeCon} required = {"required"}/>
                }
                
                {!idUsuario &&
                    <InputSh texto = "Contraseña:"  tipo="password"  name="contrasena" info={valuesUsu.contrasena} onChange={handleInputChangeCon} autocomplete="new-password" required = {"required"}/>
                }
                <InputSh texto = "Documento:" name="documento" info={valuesUsu.documento} onChange={handleInputChangeCon} required = {"required"}/>
                <SelectSh texto = "Rol:" name="rol" data={rol} selectedValue={valuesUsu.rol} onChange={handleInputChangeCon} required = {"required"}/>
                <div className="dobleBtnModal">
                    {idUsuario ? <Btnmin texto="Eliminar" tipo="button" color="#BE0416" onClick={deleteUsu}/>
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
        {showMessageErr && createPortal(
        <MensajeEliminado onClose={closeModal} />,
        document.body
        )}
        </>
    );
};

export function AreaModal({ onClose, idArea, cargar }){
    const [showMessage, setShowMessage] = useState(false);
    const [showMessageErr, setShowMessageErr] = useState(false);
    const [color, setColor] = useState('#FFFFFF');
    const [colorbs, setColorbs] = useState('#FFFFFF');


    var [valuesArea, setvaluesArea] = useState({
        nombre: "",
        iniciales: "",
    });

    useEffect(() => {
        if (idArea) {
            axios.get(`/api/area/${idArea}`)
            .then(response => {
                const data = response.data;
                setvaluesArea({
                    ...valuesArea,
                    nombre: data[0].are_nombre,
                    iniciales: data[0].are_iniciales,
                });
                setColor(data[0].are_color);
                setColorbs (data[0].are_color);
            })
            .catch(error => {
                console.error('Error buscando datos del area:', error);
            });
        }
    }, [idArea]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setvaluesArea({
            ...valuesArea,
            [name]: value,
        });
    };

    function restablecer() {
        setColor(colorbs);
    }

    function handleChange(newColor) {
        setColor(newColor.hex);
    }

    const handleSubmit= async (event) => {
        event.preventDefault();
        if(idArea){
            console.log(valuesArea);
            try {
                const response = await axios.put(`/api/area/${idArea}`,  {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }});
                setShowMessage(true);
            } catch (error) {
                console.error('Error al actualizar el area:', error);
            }
        }
        else{
            setShowMessage(true);
        }
    };

    const closeModal = (e) => {
        if(showMessage){
            setShowMessage(false);
        }
        if(showMessageErr){
            setShowMessageErr(false);
        }
        onClose(cargar);
        onClose(onClose);
    };

    const deleteArea = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.delete(`/api/area/${idArea}`);
            setShowMessageErr(true);
        } catch (error) {
            console.error('Error eliminar el area:', error);
        }
    }
    
    return (
        <>
        <div className="modal"></div>  
        <div className="contModal" >
            <div className="ttlModal" id="ttlPrivado">
                <h2>Datos del área de conocimiento</h2>
                <MdOutlineClose className="btnClose" style={{cursor:"pointer"}} size="30px" onClick={onClose}/>
            </div>

            <form onSubmit={handleSubmit}>
            <div className="infModalPriv">
                <InputSh texto = "Nombre:" name="nombre" info={valuesArea.nombre} onChange={handleInputChange} required = {"required"}/>
                <InputSh texto = "Iniciales:" name="iniciales" info={valuesArea.iniciales} onChange={handleInputChange} required = {"required"}/>
                
                <ChromePicker color={color} onChange={handleChange} width="47%" disableAlpha={true} colorFormat={"hex"}/>
                <div className="cuadroColor" >
                    <label> Color: (*) </label>
                    <div className="contCol">
                    <p >{color}</p>
                    <div style={{backgroundColor:color}} className="colorBG" ></div>
                    {idArea && <div className="restor" onClick={restablecer}> <h5>Retablecer color</h5> <MdSettingsBackupRestore/></div>}
                    </div>
                </div>
                <div className="dobleBtnModal">
                    {idArea ? <Btnmin texto="Eliminar" tipo="button" color="#BE0416" onClick={deleteArea}/>
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
        {showMessageErr && createPortal(
        <MensajeEliminado onClose={closeModal} />,
        document.body
        )}
        </>
    );
};
