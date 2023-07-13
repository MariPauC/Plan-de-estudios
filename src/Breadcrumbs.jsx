import { MdKeyboardArrowRight } from "react-icons/md";

export function PagAnterior({pagina}){ 
    return(
        <>
            <h5 style={{color:"#A9A9A9", cursor:"pointer"}}
                onMouseOver={ e => e.target.style.color = "#182B57" }
                onMouseLeave={ e => e.target.style.color = "#A9A9A9" }
            >
                {pagina}
            </h5>
            <MdKeyboardArrowRight size="20px" style={{color:"#A9A9A9"}}/>
        </>
    )
}

export function PagActual({pagina}){ 
    return(
        <>
            <h5 style={{cursor:"default"}}>{pagina}</h5>
        </>
    )
}