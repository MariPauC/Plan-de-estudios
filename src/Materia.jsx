import { useState } from "react";
import { MatPubModal, MatPrivModal } from "./Modal"
import { createPortal } from 'react-dom';
import { MdInsertComment } from "react-icons/md";
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

//Materia privada
export function MatPrivada({ data }){
    const [showModal, setShowModal] = useState(false);
    return (<>
    <div className="contMat_priv">
        <div className="mat_priv" onClick={() => setShowModal(true)}>
            {data.comentario != null ? <div className="contIconComent"> <div className="iconComent">< MdInsertComment size="20px"/></div></div> : <></>}
            <div className="titulo_materia"> 
                <div>
                    <h4>Área:</h4> 
                    <p>{ data.area }</p>
                </div>
                <hr className="lateral"/>
                <div>
                    <h4>Horas:</h4>
                    <p>{ data.horas }</p>
                </div>
                <hr className="lateral"/>
                <div>
                    <h4>Créditos:</h4>
                    <p>{ data.creditos }</p>
                </div>
            </div>
            <div className="info_materia"  style={{backgroundColor: data.color}}>
                <h2>{ data.nombre }</h2>
                <p>{ data.codigo }</p>
            </div>
        </div>
    </div>

    {showModal && createPortal(
    <MatPrivModal onClose={() => setShowModal(false)} data={data}/>,
    document.body
    )}

    </>);
}