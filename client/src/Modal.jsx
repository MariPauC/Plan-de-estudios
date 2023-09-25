import "./modal.css"
import { MdOutlineClose } from "react-icons/md";
import { InputSh, InputLg, SelectSh, TextSh } from "./CuadrosTexto";
import { Btnmin } from "./Button";
import { TablaMat } from "./Table"
import { MensajeCorrecto } from "./Mensaje";
import { useState, useEffect, useContext } from "react";
import { createPortal } from 'react-dom';
import { AuthContext } from './AuthContext';
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

export function UsuarioModal({ onClose, data }){
    const { registrar } = useContext(AuthContext);
    var [valuesRegistro, setvaluesRegistro] = useState({
        nombre: "",
        apellido: "",
        correo:"",
        contrasena: "",
        confirmacion: "",
    });

    const handleInputChangeCon = (e) => {
        const { name, value } = e.target;
        setvaluesRegistro({
            ...valuesRegistro,
            [name]: value,
        });
    };
    
    const [contrasenasMatch, setContrasenasMatch] = useState(true);

    const handleSubmit= async (event) => {
        event.preventDefault();

        if (valuesRegistro.contrasena === valuesRegistro.confirmacion) {
            registrar(valuesRegistro.nombre, valuesRegistro.apellido,valuesRegistro.correo, valuesRegistro.contrasena);
            setContrasenasMatch(true);
        } else {
            setContrasenasMatch(false);
        }
    };
    
    return (
        <>
        <div className="modal"></div>  
        <div className="contModal">
            <div className="ttlModal" id="ttlPrivado">
                <h2>Datos de la materia</h2>
                <MdOutlineClose className="btnClose" style={{cursor:"pointer"}} size="30px" onClick={onClose}/>
            </div>
            <div className="infModal" id="matPublica">
                <div className="formUsuario">
                    <form onSubmit={handleSubmit}>
                    <h3 className="ttlAdmi">Registro de usuario</h3>
                    <InputLg 
                        texto = "Nombres:" 
                        name="nombre"
                        value={valuesRegistro.nombre} 
                        onChange={handleInputChangeCon}
                    />
                    <InputLg 
                        texto = "Apellidos:" 
                        name="apellido"
                        value={valuesRegistro.apellido} 
                        onChange={handleInputChangeCon}
                    />
                    <InputLg 
                        texto = "Correo:" 
                        tipo="email" 
                        name="correo"
                        value={valuesRegistro.correo} 
                        onChange={handleInputChangeCon}
                    />
                    <InputLg 
                        texto = "Contraseña:" 
                        tipo="password" 
                        name="contrasena"
                        value={valuesRegistro.contrasena} 
                        onChange={handleInputChangeCon}
                        autocomplete="new-password"
                    />
                    <InputLg 
                        texto = "Confirmar contraseña:" 
                        tipo="password" 
                        name="confirmacion"
                        value={valuesRegistro.confirmacion} 
                        onChange={handleInputChangeCon}
                        autocomplete="new-password"
                    />
                    {!contrasenasMatch && <span style={{color:'red'}}>Las contraseñas no coinciden</span>}
                    <Btnmin tipo="submit" texto="Registrarse" color="#182B57"/>
                    {mensajeRegistro && <p>{mensajeRegistro}</p>}
                    </form>
                </div>
            </div>
        </div>
        
        {showMessage && createPortal(
        <MensajeCorrecto onClose={closeModal} />,
        document.body
        )}
        </>
    );
};