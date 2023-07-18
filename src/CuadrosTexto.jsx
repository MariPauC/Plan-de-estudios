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

export function Opcion ({ data }) {
    return (
        <option className="opcionSelect" value={data.nombre}>
            {data.nombre}
        </option>
    );
};