import React from 'react';
import ReactDOM from 'react-dom/client';
import { PublicUser } from "./PublicUser";
import { PrivateUser } from "./PrivateUser"
import { Login } from "./Login"

import './index.css';

const typeUser = true;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        {/*typeUser ? <PrivateUser/> : <PublicUser/> */}
        <PrivateUser/>
    </>
);

