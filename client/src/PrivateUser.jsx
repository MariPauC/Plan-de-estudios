import { FootShort } from "./Footer";
import AuthProvider  from './AuthContext';
import { BrowserRouter } from "react-router-dom";
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

