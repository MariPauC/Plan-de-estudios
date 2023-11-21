import "./privateUser.css"
import "./perfil.css"
import { Titul } from "./Titulo";
import { PagAnterior, PagActual} from "./Breadcrumbs"
import { Btnmin } from "./Button"
import { AutoTabla } from "./Table"
import { HeaderPriv } from "./Header"
import { AreaModal } from "./Modal"
import { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import axios from 'axios';


export function ListaAreas(){
    const [areas, setAreas] = useState([]);
    const [showModal, setShowModal] = useState(false);

    function openModal() {
        setShowModal(true)
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
    }

    useEffect(() => {
        axios.get(`/api/listaAreas`)
            .then(response => {
                setAreas(response.data) ;
            })
            .catch(error => {
                console.error('Error cargando usuarios:', error);
            });
    }, []);

    const cargarArea = async () =>{
        try {
            const response = await axios.get(`/api/listaAreas`);
            setAreas(response.data)
            console.log("carga");
        } catch (error) {
            console.error('Error cargando areas:', error);
        }
    }

    const titulos = ["Nombre", "Iniciales", "Color", "Editar"]

    return <>
        <HeaderPriv/>
        <div className="contBread">
                <PagAnterior ruta="/" pagina="Menú principal"/> 
                <PagActual pagina="Áreas del conocimiento"/>
                </div>
        <Titul titulo="Lista de áreas"/>
        <div className="contAdm">
            <div className="contBoton">
                <Btnmin texto="Añadir área" color="#182B57" onClick={openModal}/>
            </div>
            <AutoTabla titulos={titulos} data={areas} tipo="area" onclick={openModal} cargar={cargarArea}/>
        </div>
        {showModal && createPortal(
        <AreaModal onClose={() => {setShowModal(false);}} cargar={cargarArea} />,
        document.body
        )}
    </>
}