import { isEditable } from "@testing-library/user-event/dist/utils"
import "./cuadroTexto.css"

export function TextMd({ texto, info}){
    return <div className="cont_md">
        <label> {texto} </label>
        <p>{info}</p>
    </div>
}

export function InputMd({ name, texto, tipo, info, onChange }){
    return <div className="cont_md">
        <label name={name}> {texto} </label>
        <input 
            name={name} 
            type={tipo} 
            value={info} 
            onChange = {onChange}
        />
    </div>
}

export function SelectMd({ name, texto, data, onChange }){
    return <div className="cont_md">
        <label> {texto} </label>
        <select 
            name={name} 
            onChange = {onChange}
        >
                <option className="opcionSelect" value="">Selecciona una opción</option>
                {data.map((item) => ( <Opcion key={item.id} data={item}/> ))}
        </select>
    </div>
}

export function TextLg({texto, info}){
    return <div className="cont_lg">
        <label> {texto} </label>
        <p>{info}</p>
    </div>
}

export function InputLg({name, texto, tipo, info, onChange, autocomplete, required}){
    return <div className="cont_lg">
        <label> {texto} </label>
        <input 
            name={name} 
            type = {tipo} 
            value ={info} 
            onChange = {onChange}
            autoComplete = {autocomplete}
            required = {required}
        />
    </div>
}

export function InputLgBlock({name, texto, tipo, info }){
    return <div className="cont_lg">
        <label> {texto} </label>
        <input 
            name={name} 
            type = {tipo} 
            value ={info} 
            style={{backgroundColor:"#E5E5E5", cursor:"no-drop"}}
            readOnly
        />
    </div>
}

export function InputLgArch({name, texto, tipo, info, accept, onChange}){
    return <div className="cont_lgArch">
        <label> {texto} </label>
        <input 
            name={name}     
            type = {tipo} 
            value = {info}
            accept ={accept}
            onChange = {onChange}
        />
    </div>
}

export function SelectLg({ name, texto, data, onChange }){
    return <div className="cont_lg">
        <label> {texto} </label>
        <select 
            name={name}
            onChange = {onChange}
        >
                {data.map((item) => ( <Opcion key={item.id} data={item}/> ))}
        </select>
    </div>
}

export function Opcion ({ data }) {
    return (
        <option 
            className="opcionSelect" 
            value={data.nombre}
        >
            {data.nombre}
        </option>
    );
};