import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrivateUser } from "./PrivateUser"
import './index.css';
import axios from 'axios';

// Set the base URL for axios
axios.defaults.baseURL = 'http://localhost:5000'; 



const typeUser = true;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <PrivateUser/>
    </React.StrictMode>
);

