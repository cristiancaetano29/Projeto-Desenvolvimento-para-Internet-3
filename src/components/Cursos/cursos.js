import React from "react";
import './cursos.css'
import { useState, useEffect } from "react";
import Main from "../template/main/Main";
import axios from "axios";

const Cursos = () => {
    const title = "Cadastro de Cursos"
    const urlAPI = "http://localhost:5035/api/controller/cursos"
    const [data, setData] = useState([])
    const [errorTrue, setErrorTrue] = useState(false)
    const [error, setError] = useState("")
    const [lista1, setLista1] = useState({
        id: 0,
        codCurso: '',
        nomeCurso: '',
        periodo: '',
    })
    const [cursoData, setCursoData] = useState({
        id: 0,
        codCurso: '',
        nomeCurso: '',
        periodo: '',
    })

    const dataFromAPI = async () => {
        await axios(urlAPI)
            .then(resp => {
                setData(resp.data)
            })
            .catch(error => {
                console.error(error)
                setError(error)
                setErrorTrue(true)
            })

    }

    const dadosDosInputs = e => {
        const { name, value } = e.target
        setCursoData({
            ...cursoData,
            [name]: value
        })
        console.log(cursoData)
    }

    function listaAtualizada(curso, add = true){
        const lista = lista1.filter(a => a.id != curso.id)
        if(add) lista.unshift(curso)
        return lista
    }

    const adicioanrAluno = async () => {
        const dadosCurso = cursoData
        cursoData.codCurso = Number(dadosCurso.codCurso)
        const metodo = cursoData.id ? 'put' : 'post'
        const url = cursoData.id ? `${urlAPI}/${dadosCurso.id}` : urlAPI
        console.log(dadosCurso)

        axios[metodo](url, dadosCurso)
        .then(resp => {
            let lista = listaAtualizada(resp.data)
            //let lista = resp.data
            cursoData({ dadosCurso: cursoData.dadosCurso, lista})
            setLista1(lista)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const deletarAluno = async () => {

    }

    const alterarAluno = async () => {

    }

    useEffect(() => {
        dataFromAPI()
        setTimeout(()=>{
            setErrorTrue(false)
        }, 4000)
    }, [data])


    return (
        <Main title={title}>
            {errorTrue &&
                <h3> Error: {error}
                    <p>Erro encontado na API...</p>
                </h3>
            }

            <div className="inclui-container">
                <label> Codigo do Curso: </label>
                <input
                    type="number"
                    id="ra"
                    placeholder="Codigo"
                    className="form-input"
                    name="codCurso"

                value={cursoData.codCurso}
                onChange={dadosDosInputs}
                />
                <label> Curso: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="Curso"
                    className="form-input"
                    name="nomeCurso"

                value={cursoData.nomeCurso}
                onChange={dadosDosInputs}
                />
                <label> Periodo: </label>
                <input
                    type="text"
                    id="codCurso"
                    placeholder="Periodo"
                    className="form-input"
                    name="periodo"

                value={cursoData.periodo}
                onChange={dadosDosInputs}
                />
                <button className="btnSalvar"
                onClick={adicioanrAluno} 
                >
                    Salvar
                </button>
                <button className="btnCancelar"
                //onClick={e => this.limpar(e)} 
                >
                    Cancelar
                </button>
            </div>

            <div className="listagem">
                <table className="listaAlunos" id="tblListaAlunos">
                    <thead className='cabecTabela'>
                        <tr className="cabecTabela">
                            <th className='tabTituloRa'>Codigo </th>
                            <th className='tabTituloNome'>Curso</th>
                            <th className='tabTituloCurso'>Periodo</th>
                            <th>Alterar</th>
                            <th>Remover</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map(
                            (curso) =>
                                <tr key={curso.id}>
                                    <td className="val-center">{curso.codCurso}</td>
                                    <td>{curso.nomeCurso}</td>
                                    <td className="val-center">{curso.periodo}</td>
                                    <td>
                                        <button className='btn-alterar'
                                        //onClick={() => this.carregar(aluno)} className='btn-alterar'
                                        >
                                            Alterar
                                        </button>
                                    </td>
                                    <td>
                                        <button className='btn-remover'
                                        //onClick={() => this.remover(aluno)} className='btn-remover'
                                        >
                                            Remover
                                        </button>
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Main>
    )
}

export default Cursos