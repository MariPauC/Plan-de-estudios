import "./privateUser.css"
import { HeaderPriv } from "./Header";
import { Titul } from "./Titulo";
import { PagActual, PagAnterior } from "./Breadcrumbs"
import { TablaSimple } from "./Table"
import { InputMd, SelectMd } from "./CuadrosTexto"
import { Btnmin } from "./Button"
import { Link } from "react-router-dom";
import { useState } from "react";

export function DataProg(){
    var rol = true;

    const jornada = [
        { id: 1, nombre: "Diurna" },
        { id: 2, nombre: "Nocturna" },
    ]

    const sede = [
        { id: 1, nombre: "Calle 100" },
        { id: 2, nombre: "Campus Nueva Granada" },
        { id: 3, nombre: "Calle 100 - Campus " },
    ]

    const modalidad = [
        { id: 1, nombre: "A distancia" },
        { id: 2, nombre: "Presencial" },
    ]

    var [valuesProgram, setValuesProgram] = useState({
        nombreP: "",
        codigoP: "",
        semestreP: "",
        modalidadP: "",
        horasP: "",
        creditosP: "",
        regisCal: "",
        regisfecha:"",
        acreditacion:"",
        acreditafecha:"",
    });

    const handleInputChangeD = (e) => {
        const { name, value } = e.target;
        setValuesProgram({
            ...valuesProgram,
            [name]: value,
        });
    };

    const handleFormD = (e) =>{
        e.preventDefault();
        console.log(valuesProgram)
    };
    
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
            <form onSubmit={handleFormD} >
                <TablaSimple titulo="Información basica" 
                    contenido = {<>
                        <InputMd texto = "Nombre:" name="nombreP" info={valuesProgram.nombreP} onChange={handleInputChangeD}/>
                        <InputMd texto = "SNIES:" name="codigoP" info={valuesProgram.codigoP} onChange={handleInputChangeD}/>
                        <SelectMd texto = "Jornada:" name="jornadaP" data={jornada} onChange={handleInputChangeD}/>
                        <SelectMd texto = "Sede:" name="sedeP" data={sede} onChange={handleInputChangeD}/>
                        <InputMd texto = "Semestre:" name="semestreP" info={valuesProgram.semestreP} onChange={handleInputChangeD}/>
                        <SelectMd texto = "Modalidad:" name="modalidadP" data={modalidad} onChange={handleInputChangeD}/>
                        <InputMd texto = "Horas:" name="horasP" info={valuesProgram.horasP} onChange={handleInputChangeD}/> 
                        <InputMd texto = "Créditos:" name="creditosP" info={valuesProgram.creditosP} onChange={handleInputChangeD}/>
                    </>
                    }
                />
                <TablaSimple titulo="Registro calificado"
                    contenido = {<>
                        <InputMd texto = "Resolución:" name="regisCal" onChange={handleInputChangeD}/>
                        <InputMd texto = "Fecha:" tipo="date" name="regisfecha" onChange={handleInputChangeD}/>
                    </>
                    }
                />
                <TablaSimple titulo="Acreditación alta calidad"
                    contenido = {<>
                        <InputMd texto = "Resolución:" name="acreditacion" onChange={handleInputChangeD}/>
                        <InputMd texto = "Fecha:" tipo="date" name="acreditafecha" onChange={handleInputChangeD}/>
                    </>
                }
                />
                <div className="dobleBtn">
                    {rol ? <Link to='/InicioProg'><Btnmin texto="Atrás" color="#707070"/></Link>
                        : <Link to='/Inicio'><Btnmin texto="Atrás" color="#707070"/></Link>}
                        <Btnmin texto="Guardar" color="#182B57" tipo="submit"/>
                </div>
            </form>
        </div>
        </>
    )
}