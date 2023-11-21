
import { AuthContext } from './AuthContext';
import { Login } from "./Login"
import { ListaUsuarios } from "./Usuarios"
import { ListaAreas } from "./Areas"
import { PublicUser } from "./PublicUser"
import { InicioProg, InicioPrin } from "./Inicio"
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
        if(usuario.usu_rol === "Decano" || usuario.usu_rol === "Administrador"){
            rol = true;
        }
    }
    
    return(
        <Routes>
            <Route path="/login" element={<Login/>}/>   
            <Route path="/PlanEstudios/:nombre/:idPlan" element={<PublicUser rol={rol}/>}/> 
            <Route path="/usuarios" element={<ProtectedRoute><ListaUsuarios/></ProtectedRoute>}/> 
            <Route path="/areasConocimiento" element={<ProtectedRoute><ListaAreas/></ProtectedRoute>}/>  
            <Route path="/datosPlan/:nombre?/:id/:idPlan?" element={<ProtectedRoute><EditarPlanEst rol={rol}/></ProtectedRoute>}/>
            <Route path="/inicioProg/:nombre?/:id?" element={<ProtectedRoute><InicioProg rol={rol}/></ProtectedRoute>}/>
            <Route path="/" element={<ProtectedRoute><InicioPrin/></ProtectedRoute>}/>
            <Route path="/listadoPlanes/:nombre/:id" element={<ProtectedRoute><PlanEst rol={rol}/></ProtectedRoute>}/>
            <Route path="/datosPlan/:nombre?/:id/:idPlan?" element={<ProtectedRoute><EditarPlanEst rol={rol}/></ProtectedRoute>}/>
            <Route path="/datosPrograma/:accion/:nombre?/:id?" element={<ProtectedRoute><DataProg rol={rol}/></ProtectedRoute>}/>
            <Route path="/directoresPrograma/:nombre/:id/:accion?" element={<ProtectedRoute><DirctProg/></ProtectedRoute>}/>
            <Route path="/perfil" element={<ProtectedRoute><UserPerfil rol={rol}/></ProtectedRoute>}/>
        </Routes>
    );
}