import "./privateUser.css"
import { HeaderPriv } from "./Header";
import { Titul_line } from "./Titulo";
import { BtnBgIcon } from "./Button"
import { FootShort } from "./Footer";
import { MdSchool, MdLibraryBooks, MdSupervisorAccount} from "react-icons/md";

export function InicioProg(){
    const rol = false; 
    return(
        <>
        <HeaderPriv/>
        <Titul_line titulo="Ingeniería en Multimedia" subt="Facultad ingeniería" />
        <div className="contAdm">
            <div className="infoAdmi" >
                <BtnBgIcon icon = <MdSchool size="75px"/> texto="Datos del programa"/>
                <BtnBgIcon icon= <MdLibraryBooks  size="70px" /> texto="Planes de estudio"/>
                {rol ? <BtnBgIcon icon= <MdSupervisorAccount  size="75px"/> texto="Directores"/> : ""}
                
            </div>
        </div>
        <FootShort/>
        </>
    )
}