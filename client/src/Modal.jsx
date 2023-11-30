import "./modal.css"
import { MdOutlineClose } from "react-icons/md";
import { InputSh, InputShBlock, SelectSh, TextSh } from "./CuadrosTexto";
import { Btnmin } from "./Button";
import { TablaMat } from "./Table"
import { MensajeCorrecto, MensajeEliminado } from "./Mensaje";
import { useState, useEffect, useContext, useRef  } from "react";
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
    const [prerequisitos, setPrerequisitos] = useState([]);
    const [correquisitos, setCorrequisitos] = useState([]);
    const modalRef = useRef(null);
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
            });
            axios.get(`api/relacion/Prerequisito/${idMateria}`)
            .then(response => {
                setPrerequisitos(response.data); 
            })
            .catch(error => {
                console.error('Error fetching materia details:', error);
            });
            axios.get(`api/relacion/Correquisito/${idMateria}`)
            .then(response => {
                setCorrequisitos(response.data); 
            })
            .catch(error => {
                console.error('Error fetching materia details:', error);
            });
            modalRef.current.focus();
    }, []);
    
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
            
    return (
        <div className="modal" aria-modal="true" role="dialog" onKeyDown={handleKeyDown} tabIndex="-1" ref={modalRef}>
            <div className="contModal">
                <div className="ttlModal" tabIndex="1">
                    <h3>Semestre { valuesMateria.semestre }</h3>
                    <div> 
                        <p>Horas: { valuesMateria.horas }</p>
                        <hr className="lateral"/>
                        <p>Créditos: { valuesMateria.creditos }</p>
                    </div>
                </div>
                <div className="nmModal" style={{backgroundColor: color}} tabIndex="1" >
                    <h1>{valuesMateria.nombre}</h1>
                    <p>{ valuesMateria.codigo }</p>
                </div>
                <div className="infModal" id="matPublica" tabIndex="1">
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
                        {prerequisitos.length > 0 ? <>{prerequisitos.map((item) => ( <p key={item.id} > {item.nombre} </p> ))}</>
                        : <p>No existen en esta materia</p>}
                    </div>
                    <hr className="lateral"/>
                    <div>
                    <h3>Co-requisito:</h3>
                        {correquisitos.length > 0 ? <>{correquisitos.map((item) => ( <p key={item.id} > {item.nombre} </p> ))}</>
                        : <p>No existen en esta materia</p>}
                    </div>
                    
                    <div id="resumen" >
                        <hr className="arriba"/>
                        <h3>Descripción:</h3>
                        <p> {valuesMateria.descripcion} </p>
                    </div>
                </div>
                <button className="btnModal" style={{backgroundColor:color}} 
                    onMouseOver={ e => e.target.style.backgroundColor = "#E7E7E7" }
                    onMouseLeave={ e => e.target.style.backgroundColor = color }
                    onClick={onClose}
                    tabIndex="1"    
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
    const [preOriginal, setPreOriginal] = useState([]);
    const [correOriginal, setCorreOriginal] = useState([]);
    const [addpre, setAddPre] = useState([]);
    const [addcorre, setAddCorre] = useState([]);
    const [delpre, setDelPre] = useState([]);
    const [delcorre, setDelCorre] = useState([]);
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
    const listadoPre = materias.filter((materia) => materia.idMateria !== idMateria)
    .map((materia) => ({ id: materia.idMateria, nombre: materia.mat_nombre }));
    const listadoCo = materias.filter((materia) => materia.idMateria !== idMateria)
    .map((materia) => ({ id: materia.idMateria, nombre: materia.mat_nombre }));
    
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
    
    useEffect(() => {
        if (accion === "editar") {
            axios.get(`api/materia/${idMateria}`)
            .then(response => {
            const dataArray = response.data; 
            if (dataArray.length > 0) {
                const materia = dataArray[0]; 
                setValuesMateria({
                    nombre: materia.mat_nombre,
                    codigo: materia.mat_codigo,
                    horas: materia.mat_horas,
                    semestre:  materia.mat_semestre,
                    tipo:  materia.mat_tipo,
                    creditos: materia.mat_creditos,
                    descripcion: materia.mat_descripcion,
                    area: materia.area_id,
                });
                setIdPlanEstudios(materia.plan_id)
            } 
            })
            .catch(error => {
                console.error('Error fetching materia details:', error);
            });
            axios.get(`api/relacion/Prerequisito/${idMateria}`)
            .then(response => {
                setPrerequisitos(response.data); 
                setPreOriginal(response.data);
            })
            .catch(error => {
                console.error('Error fetching materia details:', error);
            });
            axios.get(`api/relacion/Correquisito/${idMateria}`)
            .then(response => {
                setCorrequisitos(response.data); 
                setCorreOriginal(response.data);
            })
            .catch(error => {
                console.error('Error fetching materia details:', error);
            });
        }
    
    }, [accion]);
    
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
        if (value !== "") {
            const idValue = parseInt(value, 10);
            const elementoEspecifico = listadoPre.find((materia) => materia.id === idValue);
            if (!prerequisitos.some((materia) => materia.id === idValue)) {
                setAddPre([...addpre, idValue]);
                setPrerequisitos([...prerequisitos, elementoEspecifico]);
            }
            if (delpre.includes(idValue)) {
                const nuevosPre = delpre.filter((materiaId) => materiaId !== idValue);
                setDelPre(nuevosPre);
            }
        }
    };

    const handleSelectCo = (e) => {
        const { value } = e.target;
        if (value !== "") {
            const idValue = parseInt(value, 10);
            const elementoEspecifico = listadoPre.find((materia) => materia.id === idValue); 

            if (!correquisitos.some((materia) => materia.id === idValue)) {
                setAddCorre([...addcorre, idValue]);
                setCorrequisitos([...correquisitos, elementoEspecifico]);
            } 
            if (delcorre.includes(idValue)) {
                const nuevosCorre = delcorre.filter((materiaId) => materiaId !== idValue);
                setDelCorre(nuevosCorre);
            }
        }
    };

    const handleFormM = async (e) =>{
        e.preventDefault();
        if(accion === "editar"){
            try {
                axios.put(`/api/materia/${idMateria}`, { valuesMateria });
                setShowMessage(true);
            } catch (error) {
                console.error('Error al actualizar la materia:', error);
            }
            if(addcorre.length !== 0 || addpre.length !== 0){
                
                try {
                    for (const matRel of addpre) {
                        if(!preOriginal.some((materia) => materia.id === matRel)){
                            axios.post(`/api/relacion/${idMateria}`, { tipo: "Prerequisito", matRel });
                        }
                    }
            
                    for (const matRel of addcorre) {
                        if(!correOriginal.some((materia) => materia.id === matRel)){    
                            axios.post(`/api/relacion/${idMateria}`, { tipo: "Correquisito", matRel });
                        }
                    }
                } catch (error) {
                    console.error('Error al añadir los requisitos:', error);
                }
            }
            if (delcorre.length !== 0 || delpre.length !== 0) {
                try {
                    for (const matRel of delpre) {
                        axios.delete(`/api/relacion/${idMateria}`, {
                            params: { tipo: "Prerequisito", matRel },
                        });
                    }
            
                    for (const matRel of delcorre) {
                        axios.delete(`/api/relacion/${idMateria}`, {
                            params: { tipo: "Correquisito", matRel },
                        });
                    }
                } catch (error) {
                    console.error('Error al eliminar los requisitos:', error);
                }
            }
            
        }
        else{
            try {
                const response = await axios.post(`/api/materia/${idPlanEstudios}`, { valuesMateria });
                const idMateriaCreada = response.data.idMateria;
                if(addcorre.length !== 0 || addpre.length !== 0){
                    try {
                        for (const matRel of addpre) {
                            axios.post(`/api/relacion/${idMateriaCreada}`, { tipo: "Prerequisito", matRel });
                        }
                        for (const matRel of addcorre) {
                            axios.post(`/api/relacion/${idMateriaCreada}`, { tipo: "Correquisito", matRel });
                        }
                    } catch (error) {
                        console.error('Error al añadir los requisitos:', error);
                    }
                }
                setShowMessage(true);
            } catch (error) {
                console.error('Error al crear la materia:', error);
            }
            
        }
        try {
            await axios.put(`/api/modificarPlan/${idPlanEstudios}`, { idUsuario });
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

    const deletePre = (id) => {
        const nuevasPrerequisitos = prerequisitos.filter((materia) => materia.id !== id);
        setPrerequisitos(nuevasPrerequisitos);
        const nuevosAddPre = addpre.filter((materiaId) => materiaId !== id);
        setAddPre(nuevosAddPre);
        if (!delpre.includes(id)) {
            setDelPre([...delpre, id]);
        }
    }

    const deleteCo = (id) => {
        const nuevosCorrequisitos = correquisitos.filter((materia) => materia.id !== id);
        setCorrequisitos(nuevosCorrequisitos);
        const nuevosAddCorre = addpre.filter((materiaId) => materiaId !== id);
        setAddCorre(nuevosAddCorre);
        if (!delcorre.includes(id)) {
            setDelCorre([...delcorre, id]);
        }
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
                    <InputSh texto = "Código:" name="codigo" info={valuesMateria.codigo} onChange={handleInputChangeM} required = {"required"}/>
                    <SelectSh texto = "Tipo asignatura:" name="tipo" data={tipoAsignatura} selectedValue={valuesMateria.tipo} onChange={handleInputChangeM} required = {"required"}/>
                    <SelectSh texto = "Semestre:" name="semestre" data={semestres} selectedValue={valuesMateria.semestre} onChange={handleInputChangeM} required = {"required"}/>
                    <InputSh texto = "Créditos:" name="creditos" info={valuesMateria.creditos} onChange={handleInputChangeM} tipo="number" required = {"required"}/>
                    <InputSh texto = "Horas:" name="horas" info={valuesMateria.horas} onChange={handleInputChangeM} tipo="number" required = {"required"}/>
                    <SelectSh valueid={true} texto = "Prerequisito:" btn={true} name="pre" data={listadoPre} onChange={handleSelectPre} tipo="button"/>
                    <SelectSh valueid={true} texto = "Correquisito:" btn={true} name="co" data={listadoCo} onChange={handleSelectCo} tipo="button"/>
                    <TablaMat data={prerequisitos} onclick={deletePre}/>
                    <TablaMat data={correquisitos} onclick={deleteCo}/>
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

export function UsuarioModal({ onClose, idUsuario, cargar}){
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
        onClose(onClose);
        cargar();
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
                <h2>Datos del usuario</h2>
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

    const handleSubmit= async (e) => {
        e.preventDefault();
        if(idArea){
            try {
                const response = await axios.put(`/api/area/${idArea}`, { valuesArea, color });
                setShowMessage(true);
            } catch (error) {
                console.error('Error al actualizar el area:', error);
            }
        }
        else{
            try {
                const response = await axios.post(`/api/area/${idArea}`, { valuesArea, color });
                setShowMessage(true);
            } catch (error) {
                console.error('Error al actualizar el area:', error);
            }
        }
    };

    const closeModal = (e) => {
        if(showMessage){
            setShowMessage(false);
        }
        if(showMessageErr){
            setShowMessageErr(false);
        }
        onClose(onClose);
        cargar();
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

export function DirectorModal({ onClose, cargar, idPrograma}){
    const [showMessage, setShowMessage] = useState(false);
    const [showMessageErr, setShowMessageErr] = useState(false);
    const { registrar } = useContext(AuthContext);

    var [valuesDirec, setvaluesDirec] = useState({
        nombre: "",
        apellido: "",
        correo:"",
        documento: "",
        contrasena: "",
        sede:"",
        rol:"Director",
        facultad:"",
    });

    const handleInputChangeCon = (e) => {
        const { name, value } = e.target;
        setvaluesDirec({
            ...valuesDirec,
            [name]: value,
        });
    };

    const handleSubmit= async (event) => {
        event.preventDefault();
        try {
            await registrar(valuesDirec.nombre, valuesDirec.apellido, valuesDirec.correo, valuesDirec.contrasena, valuesDirec.documento, valuesDirec.rol);
            const response = await axios.post(`/api/director/${idPrograma}`, { valuesDirec });
            setShowMessage(true);
        } catch (error) {
            console.error('Error al actualizar el director:', error);
        }
    };

    const closeModal = (e) => {
        if(showMessage){
            setShowMessage(false);
        }
        if(showMessageErr){
            setShowMessageErr(false);
        }
        onClose(onClose);
        cargar();
    };
    
    return (
        <>
        <div className="modal"></div>  
        <div className="contModal" >
            <div className="ttlModal" id="ttlPrivado">
                <h2>Datos del director</h2>
                <MdOutlineClose className="btnClose" style={{cursor:"pointer"}} size="30px" onClick={onClose}/>
            </div>

            <form onSubmit={handleSubmit}>
            <div className="infModalPriv">
                <InputSh texto = "Nombres:" name="nombre" info={valuesDirec.nombre} onChange={handleInputChangeCon} required = {"required"}/>
                <InputSh texto = "Apellidos:" name="apellido" info={valuesDirec.apellido} onChange={handleInputChangeCon} required = {"required"}/>
                <InputSh texto = "Correo:" tipo="email" name="correo" info={valuesDirec.correo} onChange={handleInputChangeCon} required = {"required"}/>
                <InputSh texto = "Documento:" name="documento" info={valuesDirec.documento} onChange={handleInputChangeCon} required = {"required"}/>
                <InputSh texto = "Contraseña:" name="contrasena" info={valuesDirec.contrasena} onChange={handleInputChangeCon} required = {"required"}/>
                <span style={{color:"orange", width:"47%", marginTop:"2.5%"}}> Recomendación: Dejar la contraseña igual al número de documento</span>
                
                <div className="dobleBtnModal">
                    <Btnmin texto="Cancelar" tipo="button" color="#BE0416" onClick={onClose}/> 
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