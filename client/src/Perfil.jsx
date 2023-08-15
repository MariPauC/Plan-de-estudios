import "./privateUser.css"
import "./perfil.css"
import { HeaderPriv } from "./Header";
import { PagActual, PagAnterior} from "./Breadcrumbs"
import { TextLg, InputLg, SelectLg, InputLgArch } from "./CuadrosTexto"
import { Btnmin } from "./Button"
import { MdAccountCircle, MdOutlineImageNotSupported } from "react-icons/md";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from './AuthContext';

export function UserPerfil(){
    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    };
    
    const facultad = [
        { id: 1, nombre: "Ciencias Económicas" },
        { id: 2, nombre: "Ciencias Básicas" },
        { id: 3, nombre: "Ingeniería" },
        { id: 4, nombre: "Relaciones Internacionales, Estrategia y Seguridad" },
    ];
    
    const programa = [
        { id: 1, nombre: "Multimedia" },
        { id: 2, nombre: "Mecatronica" },
    ];

    const sede= [
        { id: 1, nombre: "Calle 100" },
        { id: 2, nombre: "Campus Nueva Granada" },
    ];

    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch data from the backend API
        fetch('/api/usuario')
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // Log the response data
            setUsers(data);    // Update the state with the fetched data
        })
        .catch((error) => console.error('Error fetching data:', error));

    }, []);

    const [estadoEditar, cambioEstadoEditar] = useState(false)

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
                <Btnmin texto="Editar perfil" color="#182B57" />
                </div>
                <div>
                <Btnmin texto="Cerrar sesión" color="#BE0416" onClick={handleLogout}/>
                </div>
            </div>
            <hr></hr>
            {console.log(estadoEditar)}
            <div className="formUsuario">

                    {users.map((item) => ( <Informacion key={item.id} data={item}/> ))}
                
            </div>

        </div>
    </>

    
}

export function Informacion ({ data }) {
    return (
        <>
            <h3 className="ttlAdmi">Información principal</h3>
            <TextLg texto="Nombres:" info={data.usu_nombre}/>   
            <TextLg texto="Apellidos:" info={data.usu_apellido}/>
            <TextLg texto="Correo:" info={data.usu_correo}/>
            <TextLg texto="Documento:" info={data.usu_documento}/>    

            <h3 className="ttlAdmi">Datos del programa</h3>
            <TextLg texto="Facultad:" info={data.facultad}/>
            <TextLg texto="Programa:" info={data.programa}/>
            <TextLg texto="Sede:" info={data.sede}/> 

            <h3 className="ttlAdmi">Firma</h3>
            <div className="imgFirma"><MdOutlineImageNotSupported size="50px"/></div>
        </>
    );
}

export function FormularioUsuario ({facultad, programa, sede}){
    return (
        <form>
            <h3 className="ttlAdmi">Información principal</h3>
            <InputLg texto = "Nombres:" editable= "readonly"/>
            <InputLg texto = "Apellidos:"/>
            <InputLg texto = "Correo:" tipo="email"/>
            <InputLg texto = "Documento:"/>
            <InputLg texto = "Cargo:"/>

            <h3 className="ttlAdmi">Datos del programa</h3>
            <SelectLg texto = "Facultad:" data={facultad}/>
            <SelectLg texto = "Programa:" data={programa}/>
            <SelectLg texto = "Sede:" data={sede}/>

            <h3 className="ttlAdmi">Firma</h3>
            <InputLgArch texto = "Archivo:" tipo="file"/>
        </form>
    )
}