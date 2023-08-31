import "./table.css"
import { MdOutlineRemoveRedEye, MdOutlineMode, MdOutlineDeleteForever } from "react-icons/md";
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

export function Tabla({ estado, accion, progId, progNombre,  data }){ 
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
                {data.map((item) => ( <Columna key={item.idPlanEstudios} data={item} progId={progId} progNombre={progNombre}/> ))}
            </tbody>
        </table>
    )
}

export function Columna ({ data, progId, progNombre }) {
    let icono;
    
    function ajustarFecha(fecha) {
        if(fecha){
            const ajuste =  new Date(fecha);
            const fechaModificada = `${ajuste.getFullYear()}-${(ajuste.getMonth() + 1).toString().padStart(2, '0')}-${ajuste.getDate().toString().padStart(2, '0')}`;
            return fechaModificada;
        }
        else{
            return "-";
        }
    }

    data.pln_estado === "En desarrollo" 
    ? icono = <Link to={'/datosPlan/'+progNombre +'/'+ progId+'/'+ data.idPlanEstudios}><MdOutlineMode  className="iconTable" /></Link>
    : icono = <MdOutlineRemoveRedEye  className="iconTable" style={{cursor:"pointer"}} />;

    return (
        <tr key={data.idPlanEstudios}>
            <td>{ajustarFecha(data.pln_fechaCreacion)}</td>
            <td>{ajustarFecha(data.pln_fechaCambio)}</td>
            <td className="nombColumn">{data.usu_nombre + " " + data.usu_apellido}</td>
            <td className="estadoColumn">{data.pln_estado}</td>
            <td>{icono}</td>
        </tr>
    );
};

export function TablaMat({ data, onclick }){ 
    return(
        <table className="tablaMat">
            <tbody>
                {data.map((item) => ( <ColumnaMT key={item.idPlanEstudios} data={item} onclick={onclick} /> ))}
            </tbody>
        </table>
    )
}

export function ColumnaMT ({ data, onclick  }) {
    return (
        <tr key={data.idPlanEstudios}>
            <td>{data.nombre}</td>
            <td onclick ={onclick} id="eliminarMat"> <MdOutlineDeleteForever /> </td>
        </tr>
    );
};