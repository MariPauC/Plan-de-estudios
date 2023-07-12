import React from 'react';
import ReactDOM from 'react-dom/client';
import { PublicUser } from "./PublicUser";
import { PrivateUser } from "./PrivateUser"
import { Login } from "./Login"
import { InicioProg } from "./IniPrograma"
import './index.css';

const typeUser = true;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        {/*typeUser ? <PrivateUser/> : <PublicUser/> */}
        <InicioProg/>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
