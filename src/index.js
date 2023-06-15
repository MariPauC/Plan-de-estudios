import React from 'react';
import ReactDOM from 'react-dom/client';
import { HeaderPub, HeaderPriv } from './Header'
import { FootShort, FootLg } from "./Footer"
import { MatPublica, MatTotal } from "./Materia"
import { BtnBgSimple, BtnBgIcon} from './Button';
import { MdSupervisorAccount, MdAddCircleOutline, MdSchool } from "react-icons/md";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <HeaderPub programa="Ingeniería en Multimedia"/>
        <div className='contPlan'>
            <div className='contMaterias'> 
                <div className='contSemestre'>
                    <h3>SEMESTRE 1</h3>
                    <MatPublica area="CB" horas="5" creditos="4" nombreMat="Matematicas" codigo="100101" color="#FBF9C8"/>
                    <MatPublica area="CB" horas="6" creditos="4" nombreMat="Etica" codigo="287101" color="#ADF8C2"/>
                    
                </div>
                <div className='contSemestre'>
                    <h3>SEMESTRE 2</h3>
                    <MatPublica area="CB" horas="5" creditos="4" nombreMat="Matematicas" codigo="100101" color="#FBF9C8"/>
                    <MatPublica area="CB" horas="5" creditos="4" nombreMat="Matematicas" codigo="100101" color="#FBF9C8"/>
                </div>
                <div className='contSemestre'>
                    <h3>SEMESTRE 3</h3>
                    <MatPublica area="CB" horas="5" creditos="4" nombreMat="Matematicas" codigo="100101" color="#FBF9C8"/>
                    <MatPublica area="CB" horas="5" creditos="4" nombreMat="Matematicas" codigo="100101" color="#FBF9C8"/>
                </div>
                <div className='contSemestre'>
                    <h3>SEMESTRE 4</h3>
                    <MatPublica area="CB" horas="5" creditos="4" nombreMat="Matematicas" codigo="100101" color="#FBF9C8"/>
                    <MatPublica area="CB" horas="5" creditos="4" nombreMat="Matematicas" codigo="100101" color="#FBF9C8"/>
                    <MatPublica area="CB" horas="5" creditos="4" nombreMat="Matematicas" codigo="100101" color="#FBF9C8"/>
                </div>
                <div className='contSemestre'>
                    <h3>SEMESTRE 5</h3>
                    <MatPublica area="CB" horas="5" creditos="4" nombreMat="Matematicas" codigo="100101" color="#FBF9C8"/>
                    <MatPublica area="CB" horas="5" creditos="4" nombreMat="Matematicas" codigo="100101" color="#FBF9C8"/>
                </div>
                <div className='contSemestre'>
                    <h3>SEMESTRE 6</h3>
                    <MatPublica area="CB" horas="5" creditos="4" nombreMat="Matematicas" codigo="100101" color="#FBF9C8"/>
                    <MatPublica area="CB" horas="5" creditos="4" nombreMat="Matematicas" codigo="100101" color="#FBF9C8"/>
                </div>
            </div>
            <div className='contTotales'>
                <div className='contSemestre'>
                    <MatTotal horas="10" creditos="20"/>
                </div>
                <div className='contSemestre'>
                    <MatTotal horas="10" creditos="20"/>
                </div>
                <div className='contSemestre'>
                    <MatTotal horas="10" creditos="20"/>
                </div>
                <div className='contSemestre'>
                    <MatTotal horas="10" creditos="20"/>
                </div>
                <div className='contSemestre'>
                    <MatTotal horas="10" creditos="20"/>
                </div>
                <div className='contSemestre'>
                    <MatTotal horas="10" creditos="20"/>
                </div>
            </div>
        </div>
        
        <div className='contProgam'>
        <BtnBgSimple texto="Ingenieria en multimeda"/>
        <BtnBgIcon texto="CREAR PLAN" icon={< MdAddCircleOutline style={{fontSize:"320%", marginRight:"2%"}}/>}/>
        <BtnBgIcon texto="DIRECTORES" icon={< MdSupervisorAccount style={{fontSize:"350%", marginRight:"2%"}}/>}/>
        </div>
        
        
        <FootLg/>
        </>
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
