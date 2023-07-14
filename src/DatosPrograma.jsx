import "./privateUser.css"
import { HeaderPriv } from "./Header";
import { Titul } from "./Titulo";
import { BtnBgIcon } from "./Button"
import { Link } from "react-router-dom";
import { MdSchool, MdLibraryBooks, MdSupervisorAccount} from "react-icons/md";

export function DataProg(){
    return(
        <>
        <HeaderPriv/>
        <Titul titulo="Datos del progama" subt="Ingeniería en Multimedia" />
        <div className="contAdm">
            
        </div>
        </>
    )
}