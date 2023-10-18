import "./privateUser.css"
import "./perfil.css"
import { Titul } from "./Titulo";
import { PagAnterior, PagActual} from "./Breadcrumbs"
import { Btnmin } from "./Button"
import { AutoTabla } from "./Table"
import { HeaderPriv } from "./Header"
import { UsuarioModal } from "./Modal"
import { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import axios from 'axios';


export function ListaUsuarios(){
    const [usuarios, setUsuarios] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () =>{
        try {
            const response = await axios.get(`/api/listaUsuario`);
            setUsuarios(response.data)
            
        } catch (error) {
            console.error('Error cargando usuarios:', error);
        }
    }

    const titulos = ["Nombre", "Correo", "Cargo", "Eliminar"]

    return <>
        <HeaderPriv/>
        <div className="contBread">
                <PagAnterior ruta="/" pagina="Menú principal"/> 
                <PagActual pagina="Usuarios"/>
                </div>
        <Titul titulo="Lista de usuarios"/>
        <div className="contAdm">
            <div className="contBoton">
                <Btnmin texto="Añadir usuario" color="#182B57" onClick={() => setShowModal(true) }/>
            </div>
            <AutoTabla titulos={titulos} data={usuarios} tipo="usuario" editar ={true} cargar={cargarUsuarios()} />
        </div>
        {showModal && createPortal(
        <UsuarioModal onClose={() => {setShowModal(false);}} cargar={cargarUsuarios()}/>, 
        document.body
        )}
    </>
}