import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [mensaje, setMensaje] = useState('');
    let navigate = useNavigate();

    const verificarAutenticacion = async (token) => {
        try {
            const response = await axios.get('/api/auth/autenticacion', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsuario(response.data.usuario);
        } catch (error) {
            console.error('Error checking authentication:', error);
            setUsuario(null);
        }
    };

    const registrar = async (nombre, apellido, correo, contrasena, documento, rol) => {
        try {
            const response = await axios.post('/api/auth/registro', { nombre, apellido, correo, contrasena, documento, rol}); // Replace with your backend login route
        } catch (error) {
            console.error('Error logging in:', error);
            setUsuario(null);
        }
    };

    const login = async (correo, contrasena) => {
        try {
        const response = await axios.post('/api/auth/login', { correo, contrasena });
            setMensaje(null)
            setUsuario(response.data.usuario);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('usuario', JSON.stringify(response.data.usuario));

            navigate('/')
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
        navigate('/login')
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ usuario, mensaje, login, logout, registrar, verificarAutenticacion }}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
