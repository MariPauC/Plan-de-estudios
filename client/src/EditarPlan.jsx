import "./privateUser.css"
import { HeaderPriv } from "./Header"
import { Titul } from "./Titulo";
import { PagAnterior, PagActual} from "./Breadcrumbs";
import { PanelTab } from "./PanelTab";
import { Btnmin } from "./Button";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from './AuthContext';
import axios from "axios";


export function EditarPlanEst({rol}){ 
    const params = useParams();
    const nombrePrograma = params.nombre;
    const idPrograma = params.id;
    const idPlan = params.idPlan;

    return(
        <>
        <HeaderPriv/>
        <div className="contBread">
            <PagAnterior ruta="/" pagina="Menú principal"/>
            {rol && <PagAnterior ruta={"/InicioProg/"+nombrePrograma+'/'+idPrograma}  pagina="Programa"/>}
            <PagAnterior ruta={"/PlanesEstudios/"+nombrePrograma+'/'+idPrograma}pagina="Planes de estudio"/>
            <PagActual pagina="Datos del plan"/>
        </div>
        <Titul titulo="Edición: Plan de estudios" subt={nombrePrograma.replace(/-/g,' ')}  />
        <div className="contAdm">
            <h3 className="ttlAdmi">Materias por semestre</h3>
            <PanelTab/>
            <div className="dobleBtn">
                <Link to={'/planesEstudios/'+nombrePrograma+'/'+idPrograma}><Btnmin texto="Atrás" color="#707070"/></Link>
                <Btnmin texto="Guardar" color="#182B57"/>
            </div>
        </div>
        </>
    )
}