import "./cuadroTexto.css"
import { MdOutlineCancel, MdAddCircleOutline } from "react-icons/md";

export function TextMd({ texto, info}){
    return <div className="cont_md">
        <label> {texto} </label>
        <p>{info}</p>
    </div>
}

export function InputSh({ name, texto, tipo, info, onChange, id, required }){
    return <div className="cont_sh" id={id}>
        <label name={name}> {texto} {required && "(*)"} </label>
        <input 
            name={name} 
            type={tipo} 
            value={info} 
            onChange = {onChange}
            required = {required}
        />
    </div>
}

export function InputShBlock({ name, texto, tipo, info,  id, required }){
    return <div className="cont_sh" id={id}>
        <label name={name}> {texto} {required && "(*)"} </label>
        <input 
            name={name} 
            type={tipo} 
            value={info} 
            required = {required}
            style={{backgroundColor:"#E5E5E5", cursor:"no-drop"}}
            readOnly
        />
    </div>
}

export function TextSh({ id, name, texto, tipo, info, onChange, row, cursor, required }){
    return <div className="cont_sh" id={id}>
        <label name={name}> {texto} </label>
        <textarea
            name={name} 
            type={tipo} 
            value={info} 
            onChange = {onChange}
            rows={row}    
            cursor={cursor}
            required = {required}
            style={{resize: "vertical"}} 
            />
    </div>
}

export function SelectSh({ name, texto, data, selectedValue, onChange, id, valueid, required }){
    return <div className="cont_sh" id={id}>
        <label> {texto} {required && "(*)"} </label>
        <select 
            name={name} 
            onChange = {onChange}
            required = {required}
        >
                <option className="opcionSelect" value="">Selecciona una opción</option>
                { valueid ? data.map((item) => ( <OpcionNumber key={item.id} data={item} selectedValue={selectedValue}/> )) 
                : data.map((item) => ( <Opcion key={item.id} data={item} selectedValue={selectedValue}/> ))}
        </select>
    </div>
}

export function InputMd({ name, texto, tipo, info, onChange, required }){
    return <div className="cont_md">
        <label name={name}> {texto} </label>
        <input 
            name={name} 
            type={tipo} 
            value={info} 
            onChange = {onChange}
            required = {required}
        />
    </div>
}

export function InputMdBlock({name, texto, tipo, info }){
    return <div className="cont_md">
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

export function SelectMd({ name, texto, data, selectedValue, onChange  }){
    return <div className="cont_md">
        <label> {texto} </label>
        <select 
            name={name} 
            onChange = {onChange}
        >
                <option className="opcionSelect" value="">Selecciona una opción</option>
                {data.map((item) => ( <Opcion key={item.id} data={item} selectedValue= {selectedValue}/> ))}
        </select>
    </div>
}

export function TextLg({texto, info}){
    return <div className="cont_lg" >
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

export function SelectLg({ name, texto, data, onChange, selectedValue }){
    return <div className="cont_lg">
        <label> {texto} </label>
        <select 
            name={name}
            onChange = {onChange}
        >
                {data.map((item) => ( <Opcion key={item.id} data={item} selectedValue={selectedValue}/> ))}
        </select>
    </div>
}

export function Opcion({ data, selectedValue }) {
    return (
        <option
            className="opcionSelect"
            value={data.nombre}
            selected={data.nombre === selectedValue} // Marcar como seleccionada si el valor coincide
        >
            {data.nombre}
        </option>
    );
}

export function OpcionNumber({ data, selectedValue }) {
    return (
        <option
            className="opcionSelect"
            value={data.id}
            selected={data.id === selectedValue} // Marcar como seleccionada si el valor coincide
        >
            {data.nombre}
        </option>
    );
    }