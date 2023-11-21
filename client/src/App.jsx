import { FootShort } from "./Footer";
import AuthProvider  from './AuthContext';
import { BrowserRouter } from "react-router-dom";
import { UserRoutes } from "./Routes"


export function App(){
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

