import { FootShort } from "./Footer";
import { InicioProg, InicioDec } from "./Inicio"
import { PlanEst } from "./PlanesEstudio"
import { DataProg } from "./DatosPrograma"
import { BrowserRouter, Routes, Route } from "react-router-dom"

var rol = false;

export function PrivateUser(){
    return(
        <>
        <BrowserRouter>
            <Routes>
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

