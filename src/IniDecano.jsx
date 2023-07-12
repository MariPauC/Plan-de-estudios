import "./inidecano.css"
import { HeaderPriv } from "./Header";
import { Titul_line } from "./Titulo";
import { BtnBgSimple, Btnmin } from "./Button"
import { FootShort } from "./Footer";
import { MdSearch } from "react-icons/md";

export function InicioDec(){
    return(
        <>
        <HeaderPriv/>
        <Titul_line titulo="Programas académicos" subt="Facultad ingeniería" />
        <div className="contInDec">
            <div className="barraBusqueda">
                <input 
                    type="text" 
                    placeholder="Buscar" 
                    name="busqueda"
                    className="textBuscar"
                />
                <button type="button" className="btnBuscar">
                    <MdSearch/>
                </button>
            </div>
            <div className="barraBusqueda">
                <Btnmin texto="Crear programa" color="#182B57"/>
            </div>
            
            <div className="progamas">
                <BtnBgSimple texto="INGENIERÍA AMBIENTAL"/>
                <BtnBgSimple texto="INGENIERÍA BIOMÉDICA"/>
                <BtnBgSimple texto="INGENIERÍA CIVIL"/>
                <BtnBgSimple texto="INGENIERÍA INDUSTRIAL"/>
                <BtnBgSimple texto="INGENIERÍA EN MULTIMEDIA"/>
                <BtnBgSimple texto="INGENIERÍA EN MECATRÓNICA"/>
            </div>
                
        </div>
        
        <FootShort/>
        </>
    )
}