import { useState } from "react";
import { MatPubModal } from "./Modal"
import { createPortal } from 'react-dom';
import "./materia.css"

//Materia publica
export function MatPublica({ area, horas, creditos, nombreMat, codigo, color}){
    const [showModal, setShowModal] = useState(false);

    return (<>
    <div className="mat_pub" onClick={() => setShowModal(true)}>
        <div className="titulo_materia"> 
            <div>
                <h4>Área:</h4> 
                <p>{ area }</p>
            </div>
            <hr className="lateral"/>
            <div>
                <h4>Horas:</h4>
                <p>{ horas }</p>
            </div>
            <hr className="lateral"/>
            <div>
                <h4>Créditos:</h4>
                <p>{ creditos }</p>
            </div>
        </div>
        <div className="info_materia"  style={{backgroundColor: color}}>
            <h2>{ nombreMat }</h2>
            <p>{ codigo }</p>
        </div>
    </div>

    {showModal && createPortal(
    <MatPubModal onClose={() => setShowModal(false)} hr= {horas} cds={creditos} nm={nombreMat} cl={color} cdg={codigo}/>,
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