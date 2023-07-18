import "./privateUser.css"
import { HeaderPriv } from "./Header";
import { Titul } from "./Titulo";
import { PagActual, PagAnterior } from "./Breadcrumbs"
import { TablaSimple } from "./Table"
import { InputMd, SelectMd } from "./CuadrosTexto"
import { Btnmin } from "./Button"
import { Link } from "react-router-dom";

export function DataProg(){
    var rol = false;

    const select1 = [
        { id: 1, nombre: "Diurna" },
        { id: 1, nombre: "Nocturna" },
        ]

    return(
        <>
        <HeaderPriv/>
        <div className="contBread">
            <PagAnterior ruta="/Inicio" pagina="Menú principal"/>
            {rol ? <PagAnterior ruta="/InicioProg" pagina="Programa"/> : ""}
            <PagActual pagina="Datos del programa"/>
        </div>
        <Titul titulo="Datos del progama" subt="Ingeniería en Multimedia" />
        <div className="contAdm">
            <form>
            <TablaSimple titulo="Información basica" 
                contenido = {<>
                    <InputMd texto = "Nombre:"/>
                    <InputMd texto = "SNIES:"/>
                    <SelectMd texto = "Jornada:" data={select1}/>
                    <SelectMd texto = "Sede:" data={select1}/>
                    <InputMd texto = "Semestre:"/>
                    <SelectMd texto = "Modalidad:" data={select1}/>
                    <InputMd texto = "Horas:"/> 
                    <InputMd texto = "Créditos:"/>
                </>
                }
            />
            <TablaSimple titulo="Registro calificado"
                contenido = {<>
                    <InputMd texto = "Resolución:"/>
                    <InputMd texto = "Fecha:" tipo="date"/>
                </>
                }
            />
            <TablaSimple titulo="Acreditación alta calidad"
                contenido = {<>
                    <InputMd texto = "Resolución:"/>
                    <InputMd texto = "Fecha:" tipo="date"/>
                </>
            }
            />
            <div className="dobleBtn">
            {rol ? <Link to='/InicioProg'><Btnmin texto="Atrás" color="#707070"/></Link>
                : <Link to='/Inicio'><Btnmin texto="Atrás" color="#707070"/></Link>}
                <Btnmin texto="Guardar" color="#182B57"/>
            </div>
            </form>
        </div>
        </>
    )
}