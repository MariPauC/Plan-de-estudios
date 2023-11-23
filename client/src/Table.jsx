import "./table.css"
import { MdOutlineRemoveRedEye, MdOutlineMode, MdOutlineDeleteForever, MdDeleteOutline } from "react-icons/md";
import { UsuarioModal, AreaModal } from "./Modal"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPortal } from 'react-dom';

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

export function Tabla({ estado, accion, progId, progNombre, data, eliminar, cargar }){ 
    return(
        <table className="tabla">
            <thead className="tablaTtl">
                <tr>
                    <th>Fecha de creación</th>
                    <th>Última modificación</th>
                    <th>{estado}</th>
                    <th>Estado</th>
                    <th className="clmAccion">{accion}</th>
                    {eliminar && <th className="clmAccion">Eliminar</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => ( <Fila key={item.idPlanEstudios} data={item} progId={progId} progNombre={progNombre} eliminar={eliminar} cargar={cargar}/> ))}
            </tbody>
        </table>
    )
}

export function Fila ({ progId, progNombre, data, eliminar, cargar }) {
    let icono;
    let del;
    const nombre = progNombre;
    const navigate = useNavigate();

    const verPlan = () =>{
        navigate(`/planEstudios/${nombre}/${data.idPlanEstudios}`);
    }

    const editarPlan = () =>{
        navigate(`/datosPlan/${progNombre}/${progId}/${data.idPlanEstudios}`);
    }
    const eliminarPlanFila = async () => {
        // Llama a la función eliminarPlan con los parámetros correctos
        await eliminar(data.idPlanEstudios);
        await cargar()
        // Aquí podrías realizar alguna acción adicional después de eliminar el plan, si es necesario
      };
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

    data.pln_estado === "En desarrollo" || data.pln_estado === "Por aprobar" || data.pln_estado === "En desarrollo/Corregir"
    ? icono = <MdOutlineMode  className="iconTable" onClick={editarPlan}/>
    : icono = <MdOutlineRemoveRedEye  className="iconTable" style={{cursor:"pointer"}} onClick={verPlan}/> ;

    data.pln_estado === "En desarrollo" || data.pln_estado === "En desarrollo/Corregir"
    ? del = <MdOutlineDeleteForever className="iconTable" onClick={eliminarPlanFila} />
    : del = <></> ;

    return (
        <tr key={data.idPlanEstudios}>
            <td>{ajustarFecha(data.pln_fechaCreacion)}</td>
            <td>{ajustarFecha(data.pln_fechaCambio)}</td>
            <td className="nombColumn">{data.usu_nombre + " " + data.usu_apellido}</td>
            <td className="estadoColumn">{data.pln_estado}</td>
            <td>{icono}</td>
            <td>{del}</td>
        </tr>
    );
};

export function TablaMat({ data, onclick }){ 
    return(
        <table className="tablaMat">
            <tbody>
                {data.map((item) => ( <FilaMT key={item.id} data={item} onclick={onclick} /> ))}
            </tbody>
        </table>
    )
}

export function FilaMT ({ data, onclick }) {
    return (
        <tr key={data.id}>
        <td>{data.nombre}</td>
        <td onClick={() => onclick(data.id)} id="eliminarMat">
            <MdOutlineDeleteForever style={{marginTop:"10%"}} />
        </td>
    </tr>
    );
};


export function AutoTabla({ titulos, data, tipo, cargar, id }){ 
    const ttl = [];

    for (let i = 0; i < titulos.length; i++) {
        ttl.push(
            <th>{titulos[i]}</th>
        );
    }

    return(
        <div className="contTabla" id={id}>
        <table className="tabla">
            <thead className="tablaTtl">
                <tr>
                    {ttl}
                    
                </tr>
            </thead>
            <tbody>
                {tipo === "usuario" &&  < FilaUsuarios data={data} cargar={cargar}/> }
                {tipo === "area" &&  < FilaAreas data={data} cargar={cargar}/> }
                {tipo === "director" &&  < FilaDirectores data={data} /> }
            </tbody>
        </table>
        </div>
    )
}

export function FilaUsuarios ({ data, cargar }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const mostrarModal = (userId) => {
        setSelectedUserId(userId);
        setShowModal(true);
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
    };

    return (
        <> {data.map((item) => ( 
            <tr key={item.idUsuario}>
                <td>{item.usu_nombre+" "+item.usu_apellido}</td>
                <td>{item.usu_correo}</td>
                <td>{item.usu_rol}</td>
                <td className="tamIcono" onClick={() => mostrarModal(item.idusuario)}>
                    <MdOutlineMode className="iconTable" style={{cursor:"pointer"}} />
                </td>
            </tr>
            ))}
            {showModal && createPortal(
                <UsuarioModal onClose={() => setShowModal(false)} idUsuario={selectedUserId} cargar={cargar}/>,
                document.body
            )}
        </>
    );
};

export function FilaAreas ({ data, cargar }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedAreaId, setSelectedAreaId] = useState(null);
    
    const mostrarModal = (areaId) => {
        setSelectedAreaId(areaId);
        setShowModal(true);
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
    };
    return (
        <> {data.map((item) => ( 
            <tr key={item.idArea}>
                <td>{item.are_nombre}</td>
                <td>{item.are_iniciales}</td>
                <td style={{backgroundColor:item.are_color}} >{item.are_color}</td>
                <td onClick={() => mostrarModal(item.idArea)} className="tamIcono" > <MdOutlineMode className="iconTable" style={{cursor:"pointer"}} /> </td>
            </tr>
            ))}
            {showModal && createPortal(
                <AreaModal onClose={() => setShowModal(false)} idArea={selectedAreaId} cargar={cargar}/>,
                document.body
            )}
        </>
    );
};

export function FilaDirectores ({ data }) {
    return (
        <> {data.map((item) => ( 
            <tr key={item.idUsuario}>
                <td>{item.usu_nombre}</td>
                <td>{item.usu_apellido}</td>
                <td>{item.usu_correo}</td>
                <td>{item.fac_sede}</td>
            </tr>
            ))}
        </>
    );
};