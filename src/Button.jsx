import "./button.css"
import PropTypes from 'prop-types'

//Boton grande sin iconos
export function BtnBgSimple({ texto }){
    return <button className="btn_bg">
        <p>{texto}</p>
    </button>
}

//Boton grande con iconos
export function BtnBgIcon({texto, icon }){
    return <button className="btn_bg">
        { icon }<p id="txtIcon">{texto}</p>
        </button>
}

//Boton mediano con iconos
export function BtnMdIcon({texto, icon}){
    return <button className="btn_md">
        { icon }<p id="txtIcon">{texto}</p>
    </button>
}

export function BtnMd({texto, color}){
    return <button className="btn_md" style={{backgroundColor: color}}>
        <p>{texto}</p>
    </button>
}

export function Btnmin({texto, color}){
    return <button className="btn_mn" style={{backgroundColor: color}}>
        <p>{texto}</p>
    </button>
}

BtnBgSimple.propTypes = {
    texto: PropTypes.string.isRequired
}

Btnmin.propTypes = {
    texto: PropTypes.string.isRequired
}