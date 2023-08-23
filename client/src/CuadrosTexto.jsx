import "./cuadroTexto.css"

export function TextMd({ texto, info}){
    return <div className="cont_md">
        <label> {texto} </label>
        <p>{info}</p>
    </div>
}

export function InputSh({ name, texto, tipo, info, onChange, id }){
    return <div className="cont_sh" id={id}>
        <label name={name}> {texto} </label>
        <input 
            name={name} 
            type={tipo} 
            value={info} 
            onChange = {onChange}
        />
    </div>
}

export function TextSh({ id, name, texto, tipo, info, onChange, row, cursor }){
    return <div className="cont_sh" id={id}>
        <label name={name}> {texto} </label>
        <textarea
            name={name} 
            type={tipo} 
            value={info} 
            onChange = {onChange}
            rows={row}    
            cursor={cursor}
            />
    </div>
}

export function SelectSh({ name, texto, data, onChange, id }){
    return <div className="cont_sh" id={id}>
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