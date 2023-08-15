import "./privateUser.css"
import { HeaderPriv } from "./Header"
import { Titul } from "./Titulo";
import { TablaSimple }from "./Table"
import { TextMd } from "./CuadrosTexto"
import { Btnmin } from "./Button"
import { PagAnterior, PagActual} from "./Breadcrumbs"
import { Link } from "react-router-dom";



export function DirctProg(){ 
    const data = [
        { id: 1, nombres: "Oscar Esteban", apellidos:"Ortiz Sanchez", correo:"osOrtiz@correo.com", sede:"Calle 100", estado:"Activo"},
        { id: 17, nombres: "Sandra", apellidos: "Gutierrez", correo: "Martha Lucia Olivero Franco", sede:"Campus cajica", estado:"Inactivo" },
        ];
    return(
        <>
        <HeaderPriv/>
        <div className="contBread">
            <PagAnterior ruta="/" pagina="Menú principal"/>
            <PagAnterior ruta="/InicioProg" pagina="Programa"/> 
            <PagActual pagina="Directores"/>
        </div>
        <Titul titulo="Directores del programa" subt="Ingeniería en Multimedia" />
        
        
        <div className="contAdm">
            <div className="contBoton">
                    <Btnmin texto="Añadir director" color="#979191"/>
            </div>
            {data.map((item) => ( <InfoDirecto key={item.id} data={item}/> ))}

            <Link to='/InicioProg'><Btnmin texto="Atrás" color="#707070"/></Link>
                
            
        </div>
        </>
    )
}

export function InfoDirecto({data}){
    var tipoBoton = false
    if (data.estado == "Activo"){
        tipoBoton = true
    }
    
    return(
        <TablaSimple titulo= {"Director - "+ data.estado}
                contenido = {<>
                    <TextMd texto="Nombres:" info={data.nombres}/>
                    <TextMd texto="Apellidos:" info={data.apellidos}/>
                    <TextMd texto="Correo:" info={data.correo}/>
                    <TextMd texto="Sede:" info={data.sede}/>
                </>
            }
            />
    );
}


