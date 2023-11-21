import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

export function PagAnterior({ruta, pagina}){ 
    return(
        <>
            <Link  to={ruta}
                style={{color:"#707070", cursor:"pointer"}}
                onMouseOver={ e => e.target.style.color = "#182B57" }
                onMouseLeave={ e => e.target.style.color = "#707070" }
            >
                <h4>{pagina}</h4>
            </Link>
            <MdKeyboardArrowRight size="19px" style={{color:"#707070"}}/>
        </>
    )
}

export function PagActual({pagina}){ 
    return(
        <>
            <h4 style={{cursor:"default"}}>{pagina}</h4>
        </>
    )
}