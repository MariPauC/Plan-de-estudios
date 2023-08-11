import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [mensaje, setMensaje] = useState('');

    const checkAuthentication = async () => {
        try {
            const response = await axios.get('/api/auth/check-auth'); // Replace with your backend route to check authentication
            setUsuario(response.data.usuario);
        }catch (error) {
            console.error('Error checking authentication:', error);
            setUsuario(null);
        }
    };
    
    const registrar = async (nombre, apellido, correo, contrasena) => {
        try {
        const response = await axios.post('/api/auth/registro', { nombre, apellido, correo, contrasena }); // Replace with your backend login route
            setUsuario(response.data.usuario);
            // Save the authentication token to localStorage or sessionStorage (optional)
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Error logging in:', error);
            setUsuario(null);
        }
    };

  // Function to log in the user
    const login = async (correo, contrasena) => {
        try {
        const response = await axios.post('/api/auth/login', { correo, contrasena }); // Replace with your backend login route
            setUsuario(response.data.usuario);
            // Save the authentication token to localStorage or sessionStorage (optional)
            localStorage.setItem('token', response.data.token);
            setMensaje('Inicio de sesión exitoso');
        } catch (error) {
            console.error('Error logging in:', error);

            switch (error.response?.status) {
                case 401:
                    setMensaje('Usuario o contraseña inválidos'); 
                    break;
                case 404:
                    setMensaje('Usuario no encontrado'); 
                    break;
                case 500:
                    setMensaje('Error en el servidor'); 
                    break;
                default:
                    setMensaje('Otro tipo de error');
                    break;
            }
            setUsuario(null);
        }
    };

    // Function to log out the usuario
    const logout = () => {
        setUsuario(null);
        // Remove the authentication token from localStorage or sessionStorage (optional)
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout, registrar, mensaje }}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
