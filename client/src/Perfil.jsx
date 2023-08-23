import "./privateUser.css"
import "./perfil.css"
import { HeaderPriv } from "./Header";
import { MensajeCorrecto } from "./Mensaje";
import { PagActual, PagAnterior} from "./Breadcrumbs"
import { TextLg, InputLg, InputLgBlock, InputLgArch } from "./CuadrosTexto"
import { Btnmin } from "./Button"
import { MdAccountCircle, MdOutlineImageNotSupported } from "react-icons/md";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from './AuthContext';
import { createPortal } from 'react-dom';
import axios from "axios";

export function UserPerfil(){
    const { logout, usuario } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    };
    
    const [modoEdicion, setModoEdicion] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [user, setUser] = useState([]);

    useEffect(() => {
        if (!modoEdicion) {
            // Fetch data from the backend API
            axios.get(`/api/usuario/${usuario.idUsuario}`)
            .then(response => {
                const data = response.data;
                setUser(data);
            })
            .catch(error => {
                console.error('Error buscando datos del usuario:', error);
            });
        }
    }, [modoEdicion]);

    return <>
        <HeaderPriv/>
        <div className="contBread">
            <PagAnterior ruta="/" pagina="Menú principal"/>
            <PagActual pagina="Perfil"/>
        </div>
        <div className="contAdmDoble">
            <div className="contBtnUsuario">
                <h3 className="ttlAdmi">Perfil del usuario</h3>
                <MdAccountCircle size="155px" style={{color:"#707070"}}/>
                <div>
                {!modoEdicion && <Btnmin texto="Editar perfil" color="#182B57" onClick={() => setModoEdicion(!modoEdicion)}/>}
                </div>
                <div>
                <Btnmin texto="Cerrar sesión" color="#BE0416" onClick={handleLogout}/>
                </div>
            </div>
            <hr></hr>
            <div className="formUsuario">
                {modoEdicion ? 
                user.map((item) => ( <FormularioUsuario 
                                        key={item.idUsuario} data={item} 
                                        modoEdicion={modoEdicion} setModoEdicion={setModoEdicion}
                                        showMessage= {showMessage} setShowMessage={setShowMessage}
                                    /> ))
                : user.map((item) => ( <Informacion key={item.idUsuario} data={item} /> ))}
            </div>
        </div>
        {showMessage && createPortal(
        <MensajeCorrecto onClose={() => setShowMessage(false)} />,
        document.body
        )}
    </>

    
}

export function Informacion ({ data }) {
    return (
        <>
            <h3 className="ttlAdmi">Información Principal</h3>
            <TextLg texto="Nombres:" info={data.usu_nombre}/>   
            <TextLg texto="Apellidos:" info={data.usu_apellido}/>
            <TextLg texto="Correo:" info={data.usu_correo}/>
            <TextLg texto="Documento:" info={data.usu_documento}/>    

            <h3 className="ttlAdmi">Datos del {data.usu_rol}</h3>
            <TextLg texto="Facultad:"/>
            {data.usu_rol === "Director" && <TextLg texto="Programa:" info={data.programa}/> }
            <TextLg texto="Sede:" info={data.sede}/> 

            <h3 className="ttlAdmi">Firma</h3>
            {data.usu_firma ?  <div className="imgFirma"><MostrarImagen archivoFirma={data.usu_firma}/></div>
            :<div className="imgFirma"><MdOutlineImageNotSupported size="50px"/></div>}
        </>
    );
}

export function FormularioUsuario ({ data, modoEdicion, setModoEdicion, setShowMessage }){
    var [valuesUser, setValuesUser] = useState({
        nombre: data.usu_nombre,
        apellido: data.usu_apellido,
        documento: data.usu_documento,
        archivoFirma: null,
    });
    const [error, setError] = useState(null);

    const handleInputChangeU = (e) => {
        const { name, value } = e.target;
        setValuesUser({
            ...valuesUser,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

        if (!allowedTypes.includes(selectedFile.type)) {
            setError('Formato de archivo no válido. Solo se permiten archivos PNG, JPG y JPEG.');
            setValuesUser({
            ...valuesUser,
            archivoFirma: null, 
        });
        } else {
            setError(null);
            setValuesUser({
            ...valuesUser,
            archivoFirma: selectedFile,
            });
        }
    };

    const handleFormU = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('nombre', valuesUser.nombre);
        formData.append('apellido', valuesUser.apellido);
        formData.append('documento', valuesUser.documento);
        formData.append('archivoFirma', valuesUser.archivoFirma);
        formData.append('archivoActual', data.usu_firma);
    
        try {
            const response = await axios.put(`/api/usuario/${data.idUsuario}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Usuario actualizado con éxito:', response.data);
            setModoEdicion(false);
            setShowMessage(true);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    };
    
    
    return (
        <form onSubmit={handleFormU}>
            <h3 className="ttlAdmi">Información Principal</h3>
            <InputLg name="nombre" texto="Nombres:" required={"required"} info={valuesUser.nombre} onChange={handleInputChangeU}/>   
            <InputLg name="apellido" texto = "Apellidos:" required={"required"} info={valuesUser.apellido} onChange={handleInputChangeU}/>
            <InputLgBlock name="correo" texto = "Correo:" tipo="email" info={data.usu_correo} />
            <InputLg name="documento" texto = "Documento:" tipo="number" required={"required"} info={valuesUser.documento} onChange={handleInputChangeU} />

            <h3 className="ttlAdmi">Datos del {data.usu_rol}</h3>
            <TextLg texto="Facultad:"/>
            {data.usu_rol === "Director" && <TextLg texto="Programa:" info={data.programa}/> }
            <TextLg texto="Sede:" info={data.sede}/> 

            <h3 className="ttlAdmi">Firma</h3>
            <InputLgArch name="archivoFirma"  texto = "Archivo:" tipo="file" accept="image/png, image/jpg, image/jpeg" onChange={handleFileChange}/>
            {error && <p className="errorArchivo">{error}</p>}
            <div className="dobleBtn" id="dobleBtnAjuste">
                <Btnmin texto="Cancelar" color="#707070" onClick={() => setModoEdicion(!modoEdicion)}/>
                <Btnmin texto="Guardar" color="#182B57" tipo="submit"/>
            </div>
        </form>
    )
}

function MostrarImagen({ archivoFirma }) {
    const baseUrl = "http://localhost:5000/uploads/"; // Cambia esto a la URL real de tu servidor
    const imageUrl = baseUrl + archivoFirma;

    return (
        <img className="foto" src={imageUrl} alt="Firma del usuario" />
    );
}
