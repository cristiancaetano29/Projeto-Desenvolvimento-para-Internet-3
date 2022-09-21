import React from "react";
import './cursos.css'

export default Cursos = () => {
    return (
        <div className="Container">
            <label> Código do Curso: </label>
                <input
                    type="text"
                    id="ra"
                    placeholder="RA do aluno"
                    className="form-input"
                    name="ra"
                />
                <label> nome do Curso: </label>
                <input
                    type="text"
                    id="ra"
                    placeholder="RA do aluno"
                    className="form-input"
                    name="ra"
                />
                <label> Periodo: </label>
                <input
                    type="text"
                    id="ra"
                    placeholder="RA do aluno"
                    className="form-input"
                    name="ra"
                />
        </div>
    )
}