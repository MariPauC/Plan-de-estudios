import "./panelTab.css"
import { MatPrivada } from "./Materia"
import { useState } from "react";

export function PanelTab({tam, materias, cargar}) {
    const [panelTabsEstado, setpanelTabsEstado] = useState(0);
    const numSemestre = ["Primero", "Segundo", "Tercero", "Cuarto","Quinto","Sexto","Septimo","Octavo","Noveno","Décimo","Undécimo","Duodécimo"]

    const sumCreditos = materias.reduce((acumulador, materia) => acumulador + parseInt(materia.mat_creditos), 0);
    const sumHoras = materias.reduce((acumulador, materia) => acumulador + parseInt(materia.mat_horas), 0);

    const ttluSemestres = [];
    for (let i = 0; i < tam; i++) {
        ttluSemestres.push(
            <div key={i} className={panelTabsEstado === i ? "tabs active-tabs" : "tabs" } onClick={() => setpanelTabsEstado(i)}>
                {numSemestre[i]} 
            </div>
        );
    }

    const contSemestres = [];
    var materiasFiltradas =[];
    for (let i = 0; i < 10; i++) {
        materiasFiltradas = materias.filter(materia => materia.mat_semestre === (i + 1))
        contSemestres.push(
            <div key={i} className={panelTabsEstado === i ? "content  active-content" : "content"} onClick={() => setpanelTabsEstado(i)}>
                <div  key={i} className="contMaterias">
                    {materiasFiltradas.map((item) => ( 
                        <MatPrivada key={item.idMateria} data={item} cargar={cargar} numSemestres={tam} materias={materias}/> 
                    ))}
                </div>
            </div>);
    } 
    return (
        <>
        <div className="contSumas">
            <div>
                <h4>Créditos alcanzados: </h4>
                <p>{sumCreditos}</p>
            </div>
            <div>
                <h4>Horas alcanzadas:</h4>
                <p>{sumHoras}</p>
            </div>
            
        </div>
        <div className="contPanelTab">
            <div className="ttlTabs">
                {ttluSemestres}
            </div>
            <div className="contTabs">
                {contSemestres}
            </div>
        </div>
        
        </>
    )
}  