import "./titulo.css"

export function Titul_line( {titulo, subt} ){
    return(
        <div className="contTitul">
            <h1> {titulo} </h1>
            <h2> {subt} </h2>
            <hr/>
        </div>
    )
}

export function Titul( {titulo, subt} ){
    return(
        <div className="contTitul">
            <h1> {titulo} </h1>
            <h2> {subt} </h2>
        </div>
    )
}