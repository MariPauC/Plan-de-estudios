import { Login } from "./Login"
import { InicioProg, InicioDec } from "./Inicio"
import { PlanEst } from "./PlanesEstudio"
import { EditarPlanEst } from "./EditarPlan"
import { DataProg } from "./DatosPrograma"
import { DirctProg } from "./DirectoresPrograma"
import { UserPerfil } from "./Perfil"
import { FootShort } from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom"

var rol = true;

export function PrivateUser(){
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>    
                { rol ? <Route path="/inicioProg" element={<InicioProg/>}/>
                :
                <Route path="/inicio" element={<InicioProg/>}/>}
                { rol ? <Route path="/inicio" element={<InicioDec/>}/>
                :""}
                <Route path="/planesEstudios" element={<PlanEst/>}/>
                <Route path="/editarPlan" element={<EditarPlanEst/>}/>
                <Route path="/datosPrograma" element={<DataProg/>}/>
                <Route path="/directoresPrograma" element={<DirctProg/>}/>
                <Route path="/perfil" element={<UserPerfil/>}/>
            </Routes>
        </BrowserRouter>
        <FootShort/>
        </>
    );
}

