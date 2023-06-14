import "./materia.css"

//Materia publica
export function MatPublica({ area, horas, creditos, nombreMat, codigo, color}){
    
    return (
    <div className="mat_pub" >
        <div className="titulo_materia"> 
            <div>
                <h4>Área:</h4> 
                <p>{ area }</p>
            </div>
            <hr className="lateral"/>
            <div>
                <h4>Horas:</h4>
                <p>{ horas }</p>
            </div>
            <hr className="lateral"/>
            <div>
                <h4>Créditos:</h4>
                <p>{ creditos }</p>
            </div>
        </div>
        <div className="info_materia"  style={{backgroundColor: color}}>
            <h2>{ nombreMat }</h2>
            <p>{ codigo }</p>
        </div>
    </div>
    );
}

export function MatTotal({horas, creditos}){
    return(
        <div className="total_materia"> 
            <div>
                <h3>Total</h3> 
            </div>
            <div>
                <h4>Horas:</h4>
                <p>{ horas }</p>
            </div>
            <div>
                <h4>Créditos:</h4>
                <p>{ creditos }</p>
            </div>
        </div>
    );
}