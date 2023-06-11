import "./footer.css"
import { MdOutlineCopyright, MdFacebook } from "react-icons/md";
import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin } from "react-icons/io";
import Escudo from "./img/escudoLateral_umng.png"

//Footer simple
export function FootShort(){
    return <footer>
        <div class="foot-mn"> 
        <MdOutlineCopyright style={{color: 'white', fontSize: '120%'}}/>
        <p>2023 - Universidad Militar Nueva Granada</p>
        </div>
    </footer>
}

//Footer con información extra
export function FootLg(){
    
    const icon = { fontSize: '350%'};
    
    return <footer>
        <hr class="barra"/>
        <div class="info">
            <div class="contenedor">
                <h4>Universidad Militar Nueva Granada</h4>
                <p>
                Conmutadores: (57+1) 650 0000 - (57+1) 634 3200 
                <br/>
                Opciones 1 y 2 para comunicarse con el CALL CENTER y solicitar información general
                <br/>
                Linea gratuita nacional: 01 8000 111019
                <br/><br/>
                Solicitud de información: 
                <br/>atencionalciudadano@unimilitar.edu.co
                <br/>
                Notificaciones judiciales:  juridica@unimilitar.edu.co
                <br/><br/>
                Correo físico: Carrera 11 n.° 101-80 (Bogotá, Colombia) 
                <br/>
                Archivo y correspondencia
                Formulario de peticiones, quejas y reclamos
                </p>
            </div>
            <div class="contenedor">
                <h4>Sede Bogotá</h4>
                <p>
                Carrera 11 n.° 101-80 (Bogotá, Colombia)
                <br/>
                Horario de atención: Lunes a viernes, de 8:00 a. m. a 5:00 p. m.
                <br/>
                Facultad de Medicina y Ciencias de la Salud
                <br/>
                Transversal 3 n.° 49-00
                <br/>
                Horario de atención: Lunes a viernes, de 8:00 a. m. a 5:00 p. m.
                <br/><br/>
                Sede Posgrados  calle 94 A # 13 - 54 Lunes a viernes, de 8:00 a. m. a 5:00 p. m.
                </p>
                <h4>Sede Campus Nueva Granada</h4>
                <p>
                kilómetro 2, vía Cajicá-Zipaquirá<br/>
                Horario de atención: Lunes a viernes, de 8:00 a. m. a 5:00 p. m.
                </p>
            </div>
            <div class="contenedor">
                <img  src={Escudo}></img> 
                <ul>
                    <li> < IoLogoFacebook style={icon}/> </li>
                    <li> < IoLogoInstagram style={icon}/> </li>
                    <li> < IoLogoLinkedin style={icon}/> </li>
                </ul>
            </div>
        </div>
        <div class="foot-mn"> 
        < MdOutlineCopyright style={{color: 'white', fontSize: '140%'}} />
        <p>2023 - Universidad Militar Nueva Granada</p>
        </div>
    </footer>
}