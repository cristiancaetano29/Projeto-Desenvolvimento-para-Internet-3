import React, { useState, useEffect } from "react";
import axios from "axios";
//import './Carometro.css';

const Carometro = () => {
    const urlApiAlunos = "http://localhost:5035/api/controller"
    const urlAPICursos = "http://localhost:5035/api/controller/cursos"
    /*
    const [data, setData] = useState([])
    const [cursos, setCursos] = useState([])
    const [cursoData, setCursoData] = useState({
        id: 0,
        codCurso: '',
        nomeCurso: '',
        periodo: '',
    })
    const [alunosData, setAlunosData] = useState({
        aluno: {id: 0, ra: '', nome: '', codCurso: 0},
    })
    */
    const [dataAtualizada, setDataAtualizada] = useState(true)
    const initialState = {
        aluno: {id: 0, ra: '', nome: '', codCurso: 0},
        curso: { id: 0, codCurso: "", nomeCurso: "", periodo: "" },
        listaAlunos: [],
        listaCursos: [],
    }
    const [listaCursos, setListaCursos] = useState(initialState.listaCursos);
    const [listaAlunos, setListaAlunos] = useState(initialState.listaAlunos);
    const [curso, setCurso] = useState(initialState.curso);


    const avatar = ['adventurer', 'micah', 'bottts', 'adventurer-neutral', 'pixel-art']

    const ramdomAvatar = () => {
        let tamanho = avatar.length
        let av = Math.floor(Math.random() * tamanho)
        let rd = avatar[av]
        return rd
    }

    const getRandomLetter = () => {
        return Math.random().toString(36).substring(2, 9);
    }
    /*
        function geraStringAleatoria() {
            return Math.random().toString(36).substring(2, 9);
        }*/

    //let imgURL = () => `https://avatars.dicebear.com/api/micah/${geraStringAleatoria(8)}.svg`

    const dataFromAPI = async () => {
        await axios(urlAPICursos)
            .then(resp => {
                setDataAtualizada(true)
                setListaCursos(resp.data)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const dataFromAPI2 = async (codCurso) => {
        return await axios(urlApiAlunos)
            .then(resp => {
                const DataCursos = resp.data
                setDataAtualizada(true)
                return DataCursos.filter(
                    (aluno) => aluno.codCurso === codCurso
                );
            })
            .catch(error => {
                console.error(error)
            })
    }

    const updateAlunos = async (e) => {
        const codCurso = e.target.value;
        if (e.target.value === "") {
            setListaAlunos(initialState.listaAlunos);
            setCurso(initialState.curso);
            return
        }
        curso.codCurso = Number(codCurso)
        const listaDeAlunos = await dataFromAPI2(curso.codCurso)
        if(!Array.isArray(listaDeAlunos)) return

        setListaAlunos(listaDeAlunos)
        setCurso(curso)
    }

    useEffect(() => {
        if (dataAtualizada) {
            dataFromAPI()
            setDataAtualizada(false)
        }
    }, [dataAtualizada])

    const SelectOPT = () => {
        return (
            <select name="codCurso" onChange={e => { updateAlunos(e) }}>
                {listaCursos.map(
                    (curso) =>
                        <option
                            key={curso.id}
                            name="codCurso"
                            value={curso.codCurso}
                        >
                            {curso.nomeCurso}
                            -
                            {curso.periodo}
                        </option>

                )}
            </select>
        )
    }

    return (
        <div className="text-center duration-75 rounded-lg">
            <span>{SelectOPT()}</span>
            <div className="flex flex-wrap gap-5 w-screen items-center justify-between py-10 px-60 rounded-lg">
                {listaAlunos.map((datas) => {
                    return (
                        <div key={datas.id} className="flex flex-wrap p-5 shadow-2xl shadow-blue-700 h-[370px] rounded-lg">
                            <div className="">
                                <div className="">
                                    <div className="w-12/12 items-center self-center place-items-center">
                                        <img src={`https://avatars.dicebear.com/api/bottts/${getRandomLetter()}.svg`} alt={datas.nome} />
                                    </div>
                                </div>

                                <div className="flex flex-col flex-wrap w-[180px] pt-5 gap-3 text-left">
                                    <span className="text-xl font-medium">{datas.nome}</span>
                                    <span className="font-medium">RA: {datas.ra}</span>
                                    <span className="">Curso: {datas.codCurso}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Carometro