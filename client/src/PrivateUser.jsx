import { Login } from "./Login"
import { RegistroUsuario } from "./Registro"
import { InicioProg, InicioDec } from "./Inicio"
import { PlanEst } from "./PlanesEstudio"
import { EditarPlanEst } from "./EditarPlan"
import { DataProg } from "./DatosPrograma"
import { DirctProg } from "./DirectoresPrograma"
import { UserPerfil } from "./Perfil"
import { FootShort } from "./Footer";
import AuthProvider from './AuthContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';


var rol = true;

export function PrivateUser(){
    return(
        <>
        <BrowserRouter>
            <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login/>}/>    
                <Route path="/registro" element={<RegistroUsuario/>}/>  
                { rol ?  <Route path="/inicioProg" element={<ProtectedRoute><InicioProg/></ProtectedRoute>}/>
                : <Route path="/" element={<ProtectedRoute><InicioProg/></ProtectedRoute>}/>}
                { rol && <Route path="/" element={<ProtectedRoute><InicioDec/></ProtectedRoute>}/>}
                <Route path="/planesEstudios" element={<ProtectedRoute><PlanEst/></ProtectedRoute>}/>
                <Route path="/editarPlan" element={<ProtectedRoute><EditarPlanEst/></ProtectedRoute>}/>
                <Route path="/datosPrograma" element={<ProtectedRoute><DataProg/></ProtectedRoute>}/>
                <Route path="/directoresPrograma" element={<ProtectedRoute><DirctProg/></ProtectedRoute>}/>
                <Route path="/perfil" element={<ProtectedRoute><UserPerfil/></ProtectedRoute>}/>
            </Routes>
            </AuthProvider>
        </BrowserRouter>
        <FootShort/>
        </>
    );
}

