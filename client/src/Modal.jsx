import "./modal.css"

export function MatPubModal({ onClose, nm, cl, hr, cds, cdg }){
    return (
        <div className="modalMatPub">
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

export function MatPrivModal({ onClose, nm, cl, hr, cds, cdg }){
    return (
        <div className="modalMatPub">
            <div className="contModal">
                <div className="ttlModal">
                    <h3>Datos de la materia</h3>
                </div>
                <div className="infModal">
                    
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