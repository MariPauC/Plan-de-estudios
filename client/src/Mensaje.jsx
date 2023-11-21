import "./mensaje.css"
import { MdCheckCircleOutline, MdDeleteOutline } from "react-icons/md"

export function MensajeCorrecto({ onClose }){
    return (
        <div className="modalMessage" onClick={onClose}>
            <div className="contMessage" id="correcto">
                <div className="infMessage">
                    <MdCheckCircleOutline className="iconGrande"/>
                    <h2>DATOS GUARDADOS <br/> CORRECTAMENTE</h2>
                </div>
            </div>
        </div>
    );
};
export function MensajeEliminado({ onClose }){
    return (
        <div className="modalMessage" onClick={onClose}>
            <div className="contMessage" id="Eliminar">
                <div className="infMessage">
                    <MdDeleteOutline className="iconGrande"/>
                    <h2>DATOS ELIMINADOS <br/> CORRECTAMENTE</h2>
                </div>
            </div>
        </div>
    );
};
