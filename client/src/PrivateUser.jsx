import { Login } from "./Login"
import { RegistroUsuario } from "./Registro"
import { InicioProg, InicioDec } from "./Inicio"
import { PlanEst } from "./PlanesEstudio"
import { EditarPlanEst } from "./EditarPlan"
import { DataProg } from "./DatosPrograma"
import { DirctProg } from "./DirectoresPrograma"
import { UserPerfil } from "./Perfil"
import { FootShort } from "./Footer";
import AuthProvider  from './AuthContext';
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import { useContext } from "react";
import { UserRoutes } from "./Routes"


export function PrivateUser(){
    return(
        <>
        <BrowserRouter>
            <AuthProvider>
                <UserRoutes/>
            </AuthProvider>
        </BrowserRouter>
        <FootShort/>
        </>
    );
}

