import "./cuadroTexto.css"

export function InputMd({texto, valor, tipo}){
    return <div className="cont_md">
        <label> {texto} </label>
        <input type={tipo} value={valor}></input>
    </div>
}

export function SelectMd({texto, data}){
    return <div className="cont_md">
        <label> {texto} </label>
        <select>
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

export function InputLg({texto, valor, tipo}){
    return <div className="cont_lg">
        <label> {texto} </label>
        <input type={tipo} value={valor}></input>
    </div>
}

export function InputLgArch({texto, valor, tipo}){
    return <div className="cont_lgArch">
        <label> {texto} </label>
        <input type={tipo} value={valor}></input>
    </div>
}

export function SelectLg({texto, data}){
    return <div className="cont_lg">
        <label> {texto} </label>
        <select>
                <option className="opcionSelect" value="">Selecciona una opción</option>
                {data.map((item) => ( <Opcion key={item.id} data={item}/> ))}
        </select>
    </div>
}

export function Opcion ({ data }) {
    return (
        <option className="opcionSelect" value={data.nombre}>
            {data.nombre}
        </option>
    );
};