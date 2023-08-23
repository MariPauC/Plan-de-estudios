import "./modal.css"
import { MdOutlineCancel } from "react-icons/md";
import { InputSh, SelectSh, TextSh } from "./CuadrosTexto";
import { Btnmin } from "./Button";
import { useState } from "react";

export function MatPubModal({ onClose, nm, cl, hr, cds, cdg }){
    return (
        <div className="modal">
            <div className="contModal">
                <div className="ttlModal">
                    <h3>Semestre 3</h3>
                    <div> 
                        <p>Horas: { hr }</p>
                        <hr className="lateral"/>
                        <p>Créditos: { cds }</p>
                    </div>
                </div>
                <div className="nmModal" style={{backgroundColor: cl}}>
                    <h1>{nm}</h1>
                    <p>{ cdg }</p>
                </div>
                <div className="infModal">
                    <div>
                        <h4>Área del conocimiento:</h4>
                        <p> wedwqertfasdewr</p>
                    </div>
                    <div>
                        <h4>Tipo asignatura:</h4>
                        <p> wqerfsewdqavreav </p>
                    </div>
                    <div>
                        <h4>Prerequisito:</h4>
                        <p> 2sdasdddfgdf </p>
                    </div>
                    <div>
                        <h4>Co-requisito:</h4>
                        <p> ryresvtybhdfgvsec </p>
                    </div>
                    <div id="resumen">
                        <h4>Resumen:</h4>
                        <p> ryrdsfzaxxsdcfv sd asdasces vtybhdfgvsec ryrdsfzaxxsdcfv sd asdasces vtybhdfgvsecryrdsfzaxxsdcfv sd asdasces vtybhdfgvsecryrdsfzaxxsdcfv sd asdasces vtybhdfgvsec </p>
                    </div>
                </div>
                <button className="btnModal" style={{backgroundColor:cl}} 
                    onMouseOver={ e => e.target.style.backgroundColor = "#E7E7E7" }
                    onMouseLeave={ e => e.target.style.backgroundColor = cl }
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export function MatPrivModal({ onClose, data }){
    const tipoAsignatura = [
        { id: 1, nombre: "Ciencias basicas" },
        { id: 2, nombre: "Ciencias de la ingeniería" },
        { id: 3, nombre: "Ingeniería aplicada" },
        { id: 4, nombre: "Economico administrativa" },
        { id: 5, nombre: "Socio-Humanistica" },
        { id: 6, nombre: "Complementaria" },
    ]
    const area = [
        { id: 1, nombre: "Ciencias basicas" },
        { id: 2, nombre: "Ciencias de la ingeniería" },
        { id: 3, nombre: "Ingeniería aplicada" },
        { id: 4, nombre: "Economico administrativa" },
        { id: 5, nombre: "Socio-Humanistica" },
        { id: 6, nombre: "Complementaria" },
    ]

    var [valuesMateria, setValuesMateria] = useState({
        nombre: data.nombre,
        codigo: data.codigo,
        horas: data.horas,
        tipo: "Ingeniería aplicada",
        creditos: data.creditos,
        descripcion: data.descripcion,
        comentario: data.comentario,
    });
    
    const handleInputChangeM = (e) => {
        const { name, value } = e.target;
        setValuesMateria({
            ...valuesMateria,
            [name]: value,
        });
    };

    const handleFormM = (e) =>{
        e.preventDefault();
        console.log(valuesMateria)
    };
    
    return (
        <div className="modal" >
            <div className="contModal">
                <div className="ttlModal">
                    <h2>Datos de la materia</h2>
                    <MdOutlineCancel className="btnClose"  size="30px" onClick={onClose}/>
                </div>
                <form>
                <div className="infModalPriv">
                    <InputSh texto = "Nombre:" name="nombre" info={data.nombre} onChange={handleInputChangeM}/>
                    <InputSh texto = "Código:" name="codigo" info={data.codigo} onChange={handleInputChangeM}/>
                    <SelectSh texto = "Tipo asignatura:" name="tipo" data={tipoAsignatura} onChange={handleInputChangeM}/>
                    <div className="dobleInput">
                        <InputSh texto = "Créditos:" name="creditos" info={data.creditos} onChange={handleInputChangeM}/>
                        <InputSh texto = "Horas:" name="horas" info={data.horas} onChange={handleInputChangeM}/>
                    </div>
                    <SelectSh texto = "Área conocimientos:" id="big" name="tipo" data={area} onChange={handleInputChangeM}/>
                    <TextSh texto = "Descripción:" id="big" row="3" name="descripcion" info={data.descripcion} onChange={handleInputChangeM}/>
                    <div className="dobleBtnModal">
                        <Btnmin texto="Eliminar" tipo="button" color="#BE0416"/>
                        <Btnmin texto="Guardar" color="#182B57" tipo="submit"/>
                    </div>
                </div>
                {data.comentario ? 
                <div className="contComent">
                    <TextSh 
                        texto = "Comentario:" 
                        id="big" row="3" 
                        name="comentario" 
                        info={data.comentario} 
                        onChange={handleInputChangeM} 
                        cursor = "not-allowed"
                        readonly/>
                </div>
                
                : null}
                
                
                </form>
            </div>
        </div>
    );
};