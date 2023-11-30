import { useState, useRef } from "react";
import { MatPubModal, MatPrivModal } from "./Modal"
import { createPortal } from 'react-dom';
import "./materia.css"

//Materia publica
export function MatPublica({ data }){
    const [showModal, setShowModal] = useState(false);
    const focusedElementRef = useRef(null);

    const openModal = () => {
        
        focusedElementRef.current = document.activeElement;
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    
        if (focusedElementRef.current) {
            focusedElementRef.current.focus();
        }
    };

    return (<>
    <div className="mat_pub" onClick={openModal} tabindex="0" role="button" id={`Materia_${data.idMateria}`}
        onKeyDown={(event) => {
            if (event.key === 'Enter') {
                setShowModal(true);
            }
        }}
    >
        <div className="titulo_materia"> 
            <div>
                <h4>Área:</h4> 
                <p>{ data.are_iniciales }</p>
            </div>
            <hr className="lateral"/>
            <div>
                <h4>Horas:</h4>
                <p>{ data.mat_horas }</p>
            </div>
            <hr className="lateral"/>
            <div>
                <h4>Créditos:</h4>
                <p>{  data.mat_creditos }</p>
            </div>
        </div>
        <div className="info_materia"  style={{backgroundColor: data.are_color}}>
            <h3>{ data.mat_nombre }</h3>
            <p>{ data.mat_codigo }</p>
        </div>
    </div>

    {showModal && createPortal(
    <MatPubModal onClose={closeModal} idMateria={data.idMateria} color={data.are_color} area={data.are_nombre}/>,
    document.body
    )}

    </>);
}

export function MatTotal({horas, creditos}){
    return(
        <div className="total_materia"> 
            <div>
                <h3>Total</h3> 
            </div>
            <div>
                <h4>Horas:</h4>
                <p>{ horas }</p>
            </div>
            <div>
                <h4>Créditos:</h4>
                <p>{ creditos }</p>
            </div>
        </div>
    );
}

//Materia privada
export function MatPrivada({ data, cargar, numSemestres, materias }){
    const [showModal, setShowModal] = useState(false);

    function openModal() {
        setShowModal(true)
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
    }

    const closeModal = (e) => {
        setShowModal(false);
        cargar();
    };

    return (<>
    <div className="contMat_priv">
        <div className="mat_priv" onClick={openModal}>
            <div className="titulo_materia"> 
                <div>
                    <h4>Área:</h4> 
                    <p>{ data.are_iniciales }</p>
                </div>
                <hr className="lateral"/>
                <div>
                    <h4>Horas:</h4>
                    <p>{ data.mat_horas }</p>
                </div>
                <hr className="lateral"/>
                <div>
                    <h4>Créditos:</h4>
                    <p>{ data.mat_creditos }</p>
                </div>
            </div>
            <div className="info_materia"  style={{backgroundColor: data.are_color}}>
                <h3>{ data.mat_nombre }</h3>
                <p>{ data.mat_codigo}</p>
            </div>
        </div>
    </div>
       
    {showModal && createPortal(
    <MatPrivModal onClose={closeModal} cargar={cargar} numSemestres={numSemestres} idMateria={data.idMateria} accion= "editar" materias={materias}/>,
    document.body
    )}

    </>);
}