import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({children}) => {
    const {usuario} = useContext(AuthContext); 
    
    return <>{!usuario ? <Navigate to="/login" /> : {children }}</>
};

export default ProtectedRoute;
