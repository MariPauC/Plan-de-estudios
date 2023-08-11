import "./table.css"
import { MdOutlineRemoveRedEye, MdOutlineMode, MdOutlineEditOff } from "react-icons/md";
import { Link } from "react-router-dom";

export function TablaSimple({titulo, contenido}){ 
    return(
        <div className="tabSimple">
            <div className="tabSimpleTtl">
                <h3>{titulo}</h3>
            </div>
            <div className="tabSimpleCont">
                {contenido}
            </div>
        </div>
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
            icono = <Link to='/editarPlan'><MdOutlineMode size={"25px"} style={{cursor:"pointer"}}/></Link>;
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

