import React from "react";
import './cursos.css'

const Cursos = () => {
    return (
        <div className="inclui-container">
            <label> RA: </label>
            <input
                type="text"
                id="ra"
                placeholder="RA do aluno"
                className="form-input"
                name="ra"
                
                /*value={this.state.aluno.ra}
                onChange={e => this.atualizaCampo(e)}*/
                
            />
            <label> Nome: </label>
            <input
                type="text"
                id="nome"
                placeholder="Nome do aluno"
                className="form-input"
                name="nome"

                /*value={this.state.aluno.nome}
                onChange={e => this.atualizaCampo(e)}*/
            />
            <label> Código do Curso: </label>
            <input
                type="number"
                id="codCurso"
                placeholder="0"
                className="form-input"
                name="codCurso"

                /*value={this.state.aluno.codCurso}
                onChange={e => this.atualizaCampo(e)}*/
            />
            <button className="btnSalvar"
                /*onClick={e => this.salvar(e)}*/ >
                Salvar
            </button>
            <button className="btnCancelar"
                /*onClick={e => this.limpar(e)}*/ >
                Cancelar
            </button>
        </div>

        
    )
}

export default Cursos