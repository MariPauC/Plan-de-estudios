import { Login } from "./Login"
import { InicioProg, InicioDec } from "./Inicio"
import { PlanEst } from "./PlanesEstudio"
import { DataProg } from "./DatosPrograma"
import { FootShort } from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom"

var rol = true;

export function PrivateUser(){
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>    
                { rol ? <Route path="/InicioProg" element={<InicioProg/>}/>
                :
                <Route path="/Inicio" element={<InicioProg/>}/>}
                { rol ? <Route path="/Inicio" element={<InicioDec/>}/>
                :""}
                <Route path="/PlanesEstudios" element={<PlanEst/>}/>
                <Route path="/DatosPrograma" element={<DataProg/>}/>
            </Routes>
        </BrowserRouter>
        <FootShort/>
        </>
    );
}

