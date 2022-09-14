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

class CrudAluno extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        })
    }

    // componentDidMount() {
    //     axios(urlAPI).then(resp => {
    //         this.setState({ lista: resp.data })
    //     })
    //     fetch(urlAPI)
    //     .then(resp => {resp.json()})
    //     .then(resposta => {console.log(resposta)})
    // }

    limpar() {
        this.setState({ aluno: initialState.aluno })
    }

    salvar() {
        const aluno = this.state.aluno;
        aluno.codCurso = Number(aluno.codCurso);
        const metodo = 'post';

        axios[metodo](urlAPI, aluno)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ aluno: initialState.aluno, lista })
            });
    }

    getListaAtualizada(aluno) {
        const lista = this.state.lista.filter(a => a.id !== aluno.id);
        lista.unshift(aluno);
        return lista;
    }

    atualizaCampo(evento) {
        const aluno = { ...this.state.aluno };
        aluno[event.target.name] = event.target.value
        this.setState({ aluno })
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
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.lista.map(
                            (aluno) =>
                            <tr key={aluno.id}>
                                <td>{aluno.ra}</td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.codCurso}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return(
            <Main title={title}>
                {this.renderTable()}
            </Main>
        )
    }
}

export default CrudAluno;
