
import { AuthContext } from './AuthContext';
import { Login } from "./Login"
import { RegistroUsuario } from "./Registro"
import { PublicUser } from "./PublicUser"
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
            <Route path="/PlanEstudios" element={<PublicUser/>}/>  
            { rol ?  <Route path="/inicioProg/:nombre/:id" element={<ProtectedRoute><InicioProg rol={rol}/></ProtectedRoute>}/>
            : <Route path="/" element={<ProtectedRoute><InicioProg rol={rol} /></ProtectedRoute>}/>}
            { rol && <Route path="/" element={<ProtectedRoute><InicioDec rol={rol}/></ProtectedRoute>}/>}
            <Route path="/planesEstudios/:nombre/:id" element={<ProtectedRoute><PlanEst rol={rol}/></ProtectedRoute>}/>
            <Route path="/datosPlan/:nombre?/:id/:idPlan?" element={<ProtectedRoute><EditarPlanEst rol={rol}/></ProtectedRoute>}/>
            <Route path="/datosPrograma/:accion/:nombre?/:id?" element={<ProtectedRoute><DataProg rol={rol}/></ProtectedRoute>}/>
            <Route path="/directoresPrograma/:nombre/:id" element={<ProtectedRoute><DirctProg/></ProtectedRoute>}/>
            <Route path="/perfil" element={<ProtectedRoute><UserPerfil rol={rol}/></ProtectedRoute>}/>
        </Routes>
    );
}