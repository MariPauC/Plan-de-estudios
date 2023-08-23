import { createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Btnmin } from "./Button"

const LogoutContext = createContext();
    
export function LogoutSpace({children}) {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <LogoutContext onClick={handleLogout}>
            {children}
        </LogoutContext>
    );
}; 

export function LogoutBtn() {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <Btnmin texto="Cerrar sesión" color="#BE0416" onClick={handleLogout}/>
    );
};