import "./privateUser.css"
import "./perfil.css"
import { TitulLine } from "./Titulo";
import { PagAnterior, PagActual} from "./Breadcrumbs"

import { Btnmin } from "./Button"
import { AutoTabla } from "./Table"
import { HeaderPriv } from "./Header"
import { useState, useEffect } from "react";
import axios from 'axios';

export function ListaUsuarios(){
    const [usuarios, setUsuarios] = useState([]);


    useEffect(() => {
        
        axios.get(`/api/listaUsuario`)
        .then(response => {
            const data = response.data;
            setUsuarios (data);
        })
        .catch(error => {
            console.error('Error buscando planes en desarrollo:', error);
            
        });
        
    }, []);

    const titulos = ["Nombre", "Correo", "Cargo", "Eliminar"]

    return <>
        <HeaderPriv/>
        <div className="contBread">
                <PagAnterior ruta="/" pagina="Menú principal"/> 
                <PagActual pagina="Usuarios"/>
                </div>
        <TitulLine titulo="Lista de usuarios" subt=" "/>
        <div className="contAdm">
            <div className="contBoton">
                <Btnmin texto="Crear programa" color="#182B57"/>
            </div>
            <AutoTabla titulos={titulos} data={usuarios} tipo="usuario" editar ={true}/>
        </div>
    </>
}