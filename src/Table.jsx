import "./table.css"
import { MdOutlineRemoveRedEye, MdOutlineMode, MdOutlineEditOff } from "react-icons/md";

export function TablaDoble({numcol}){ 
    return(
        <table>
            <tr className="ttl">
                <th className="unttl" style={{columnSpan: numcol}}></th>
            </tr>
        </table>
    )
}

export function Tabla({ estado, accion, data}){ 
    return(
        <table className="tabla">
            <thead className="tablaTtl">
                <tr>
                    <th>Fecha de creación</th>
                    <th>Última modificación</th>
                    <th>{estado}</th>
                    <th>Estado</th>
                    <th className="clmAccion">{accion}</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => ( <Columna key={item.id} data={item}/> ))}
            </tbody>
        </table>
    )
}

export function Columna ({ data }) {
    let icono;
    switch (data.estado) {
        case "En desarrollo":
            icono = <MdOutlineMode size={"25px"} style={{cursor:"pointer"}}/>;
            break;
        case "En revisión":
            icono = <MdOutlineEditOff size={"25px"} style={{color:"#BE0416", cursor:"no-drop"}}/>;
            break;
        default:
            icono = <MdOutlineRemoveRedEye size={"25px"} style={{cursor:"pointer"}} />;
            break;
    }

    return (
        <tr>
            <td>{data.nombre}</td>
            <td>{data.apellido}</td>
            <td>{data.edad}</td>
            <td>{data.estado}</td>
            <td>{icono}</td>
        </tr>
    );
};