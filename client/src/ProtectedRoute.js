import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { verificarAutenticacion } = useContext(AuthContext); 
    const token = localStorage.getItem('token');

    // Estado para almacenar si la autenticación se ha verificado
    const [autenticacionVerificada, setAutenticacionVerificada] = useState(false);

    useEffect(() => {
        if (token && !autenticacionVerificada) {
            verificarAutenticacion(token);
            setAutenticacionVerificada(true);
        }
    }, [autenticacionVerificada, token, verificarAutenticacion]);

    const { usuario } = useContext(AuthContext);

    return !usuario ? <Navigate to="/login" /> : children;
};

export default ProtectedRoute;
