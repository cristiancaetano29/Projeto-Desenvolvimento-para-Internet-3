import React, { Component } from "react";
import './CrudAluno.css';
import Main from "../template/main/Main";
import axios from "axios";

const title = "Cadastro de Alunos";

const urlAPI = "http://localhost:5035/api/controller"
const initialState = {
    aluno: { id: 0, ra: '', nome: '', codCurso: 0 },
    lista: [],
}

const urlApiCursos = "http://localhost:5035/api/controller/cursos"
const initialStateCurso = {
    curso: { codCurso: '', id: 0, nomeCurso: '', periodo: '' },
    listaCurso: [],
}

export default class CrudAluno extends Component {

    state = { ...initialState, ...initialStateCurso }

    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        })

        axios(urlApiCursos).then(resp => {
            this.setState({ listaCurso: resp.data })
            console.log(this.state.listaCurso)
        })
    }

    limpar() {
        this.setState({ aluno: initialState.aluno })
    }

    salvar() {
        const aluno = this.state.aluno;
        aluno.codCurso = Number(aluno.codCurso);
        const metodo = aluno.id ? 'put' : 'post';
        const url = aluno.id ? `${urlAPI}/${aluno.id}` : urlAPI

        axios[metodo](url, aluno)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ aluno: initialState.aluno, lista })
            });
    }

    getListaAtualizada(aluno, add = true) {
        const lista = this.state.lista.filter(a => a.id !== aluno.id);
        if (add) lista.unshift(aluno);
        return lista;
    }

    atualizaCampo(evento) {
        const aluno = { ...this.state.aluno };
        aluno[evento.target.name] = evento.target.value
        this.setState({ aluno })
    }

    atualizaCurso(evento) {
        const curso = { ...this.state.curso };
        curso[evento.target.name] = evento.target.value
        this.setState({ curso })
    }

    carregar(aluno) {
        this.setState({ aluno })
        const url = urlAPI + "/" + aluno.id;
        if (window.confirm("Confirma edição do aluno: " + aluno.ra)) {
            console.log("entrou no confirm");
            axios['PUT'](url, aluno).then(resp => {
                const lista = this.getListaAtualizada(aluno, false);
                this.setState({ aluno: initialState.aluno, lista });
            });
        }
        this.atualizaCampo(aluno);
    }

    remover(aluno) {
        const url = urlAPI + "/" + aluno.id;
        if (window.confirm("Confirma remoção do aluno: " + aluno.ra)) {
            console.log("entrou no confirme da tela")

            axios['delete'](url, aluno)
                .then(resp => {
                    const lista = this.getListaAtualizada(aluno, false)
                    this.setState({ aluno: initialState.aluno, lista })
                })
        }
    }

    renderForm() {
        return (
            <div className="inclui-container">
                <label> RA: </label>
                <input
                    type="text"
                    id="ra"
                    placeholder="RA do aluno"
                    className="form-input"
                    name="ra"

                    value={this.state.aluno.ra}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Nome: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="Nome do aluno"
                    className="form-input"
                    name="nome"

                    value={this.state.aluno.nome}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Código do Curso: </label>
                {/* <input
                    type="number"
                    id="codCurso"
                    placeholder="0"
                    className="form-input"
                    name="codCurso"

                    value={this.state.aluno.codCurso}
                    onChange={e => this.atualizaCampo(e)}
                /> */}
                    <select>
                        {this.state.listaCurso.map(
                            (curso) => 
                                <option name="codCurso" onChange={e => this.atualizaCurso(e)} value={curso.codCurso}>
                                    { curso.nomeCurso }
                                    - 
                                    { curso.periodo }
                                </option>
                    )}
                    </select>
                
                <button className="btnSalvar"
                    onClick={e => this.salvar(e)} >
                    Salvar
                </button>
                <button className="btnCancelar"
                    onClick={e => this.limpar(e)} >
                    Cancelar
                </button>
            </div>
        )
    }

    renderTable() {
        return (
            <div className="listagem">
                <table className="listaAlunos" id="tblListaAlunos">
                    <thead className='cabecTabela'>
                        <tr className="cabecTabela">
                            <th className='tabTituloRa'>Ra</th>
                            <th className='tabTituloNome'>Nome</th>
                            <th className='tabTituloCurso'>Curso</th>
                            <th>Alterar</th>
                            <th>Remover</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.lista.map(
                            (aluno) =>
                                <tr key={aluno.id}>
                                    <td>{aluno.ra}</td>
                                    <td>{aluno.nome}</td>
                                    <td>{aluno.codCurso}</td>
                                    <td>
                                        <button onClick={() => this.carregar(aluno)} className='btn-alterar'>
                                            Alterar
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.remover(aluno)} className='btn-remover'>
                                            Remover
                                        </button>
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            <Main title={title}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
