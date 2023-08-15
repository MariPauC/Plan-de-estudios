
import { AuthContext } from './AuthContext';
import { Login } from "./Login"
import { RegistroUsuario } from "./Registro"
import { InicioProg, InicioDec } from "./Inicio"
import { PlanEst } from "./PlanesEstudio"
import { EditarPlanEst } from "./EditarPlan"
import { DataProg } from "./DatosPrograma"
import { DirctProg } from "./DirectoresPrograma"
import { UserPerfil } from "./Perfil"
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import { useContext } from "react";

export function UserRoutes(){
    let rol = false;
    
    const {usuario} = useContext(AuthContext)
    if (usuario){
        if(usuario.usu_rol === "Decano"){
            rol = true;
        }
    }
    
    
    return(
        <Routes>
            <Route path="/login" element={<Login/>}/>    
            <Route path="/registro" element={<RegistroUsuario/>}/>  
            { rol ?  <Route path="/inicioProg" element={<ProtectedRoute><InicioProg rol={rol}/></ProtectedRoute>}/>
            : <Route path="/" element={<ProtectedRoute><InicioProg rol={rol} /></ProtectedRoute>}/>}
            { rol && <Route path="/" element={<ProtectedRoute><InicioDec rol={rol}/></ProtectedRoute>}/>}
            <Route path="/planesEstudios" element={<ProtectedRoute><PlanEst rol={rol}/></ProtectedRoute>}/>
            <Route path="/editarPlan" element={<ProtectedRoute><EditarPlanEst rol={rol}/></ProtectedRoute>}/>
            <Route path="/datosPrograma" element={<ProtectedRoute><DataProg rol={rol}/></ProtectedRoute>}/>
            <Route path="/directoresPrograma" element={<ProtectedRoute><DirctProg/></ProtectedRoute>}/>
            <Route path="/perfil" element={<ProtectedRoute><UserPerfil rol={rol}/></ProtectedRoute>}/>
        </Routes>
    );
}