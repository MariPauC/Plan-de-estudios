import "./panelTab.css"
import { MatPrivada } from "./Materia"
import { BtnMinIcon } from "./Button"
import { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md"

export function PanelTab() {
    const [panelTabsEstado, setpanelTabsEstado] = useState(0);
    const numSemestre = ["Primero", "Segundo", "Tercero", "Cuarto","Quinto","Sexto","Septimo","Octavo","Noveno","Décimo","Undécimo","Duodécimo"]
    
    const ttluSemestres = [];
    for (let i = 0; i < 10; i++) {
        ttluSemestres.push(
            <div key={i} className={panelTabsEstado === i ? "tabs active-tabs" : "tabs" } onClick={() => setpanelTabsEstado(i)}>
                {numSemestre[i]} 
            </div>
        );
    }

    const materias = [
        { id: 1, nombre: "Matematicas", semestre: "3", color:"#FBF9C8", creditos:"3", horas:"6"},
        { id: 2, nombre: "Catedra", semestre: "1", color:"#FBF9C8", creditos:"3", horas:"6"},
        { id: 3, nombre: "Etica", semestre: "4", color:"#FBF9C8", creditos:"1", horas:"2"},
        { id: 4, nombre: "Programación I", semestre: "1", color:"#FBF9C8", creditos:"2", horas:"4" },
        { id: 5, nombre: "Programación II", semestre: "3", color:"#FBF9C8", creditos:"3", codigo:"785123", horas:"3", comentario:"yfgd" },
    ];

    const sumCreditos = materias.reduce((acumulador, materia) => acumulador + parseInt(materia.creditos), 0);
    const sumHoras = materias.reduce((acumulador, materia) => acumulador + parseInt(materia.horas), 0);

    const contSemestres = [];
    var materiasFiltradas =[];
    for (let i = 0; i < 10; i++) {
        materiasFiltradas = materias.filter(materia => materia.semestre === (i + 1).toString() )
        console.log(materiasFiltradas)
        contSemestres.push(
            <div key={i} className={panelTabsEstado === i ? "content  active-content" : "content"} onClick={() => setpanelTabsEstado(i)}>
                <div  key={i} className="contMaterias">
                    {materiasFiltradas.map((item) => ( 
                        <MatPrivada key={item.id}  data={item}/> 
                    ))}
                </div>
            </div>);
    } 
    return (
        <>
        <div className="contPanelTab">
            <div className="ttlTabs">
                {ttluSemestres}
            </div>
            <div className="contTabs">
                {contSemestres}
            </div>
        </div>
        <div className="contSumas">
            <div>
                <h4>Créditos alcanzados: </h4>
                <p>{sumCreditos}/ 250</p>
            </div>
            <div>
                <h4>Horas alcanzadas:</h4>
                <p>{sumHoras}/ 250</p>
            </div>
            
        </div>
        </>
    )
}  


