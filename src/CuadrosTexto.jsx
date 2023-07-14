import "./cuadroTexto.css"

export function InputMd({texto, valor}){
    return <div className="cont_md">
        <label>{texto}
        <input value={valor}></input>
        </label>
    </div>
}

export function InputMd({texto, data}){
    return <div className="cont_md">
        <label>
            {texto}
            <select>
                <option value="">--Selecciona una opción--</option>
                {data.map((item) => ( <Opcion key={item.id} data={item}/> ))}
            </select>
        </label>
    </div>
}

export function Opcion ({ data }) {
    return (
        <option value={data.nombe}>
            {data.nombe}
        </option>
    );
};