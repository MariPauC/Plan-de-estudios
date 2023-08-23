import "./mensaje.css"
import {MdClose, MdCheckCircleOutline} from "react-icons/md"

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

