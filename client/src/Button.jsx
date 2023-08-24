import "./button.css"
import PropTypes from 'prop-types'

//Boton grande sin iconos
export function BtnBgSimple({ texto }){
    return <button className="btn_bg">
        <p>{texto}</p>
    </button>
}

//Boton grande con iconos
export function BtnBgIcon({texto, tipo, icon }){
    return <button 
                className="btn_bg"
                type={tipo}
            >
        { icon }<p id="txtIcon">{texto}</p>
        </button>
}

//Boton mediano con iconos
export function BtnMdIcon({texto, tipo, icon, onClick}){
    return <button 
                className="btn_md"
                type={tipo}
                onClick={onClick}
            >
        { icon }<p id="txtIcon">{texto}</p>
    </button>
}

export function BtnMd({texto, tipo, color}){
    return <button 
                className="btn_md" 
                type={tipo}
                style={{backgroundColor: color}}
            >
        <p>{texto}</p>
    </button>
}

export function Btnmin({texto, tipo, color, onClick}){
    return <button 
                className="btn_mn" 
                type={tipo}
                style={{backgroundColor: color}} 
                onClick={onClick} 
            >
        <p>{texto}</p>
    </button>
}

export function BtnMinIcon({texto, tipo, icon}){
    return <div 
                className="btn_mnIcon"
                type={tipo}
            >
        <div>
        { icon }<p id="txtIcon">{texto}</p>
        </div>
        
    </div>
}

BtnBgSimple.propTypes = {
    texto: PropTypes.string.isRequired
}

Btnmin.propTypes = {
    texto: PropTypes.string.isRequired
}