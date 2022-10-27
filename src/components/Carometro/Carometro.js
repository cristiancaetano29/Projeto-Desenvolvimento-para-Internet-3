import React, { useState, useEffect } from "react";
import axios from "axios";

const Carometro = () => {
    const urlApiAlunos = "http://localhost:5035/api/controller"
    const urlAPICursos = "http://localhost:5035/api/controller/cursos"
    const [dataAtualizada, setDataAtualizada] = useState(true)
    const [searchInput, setSearchInput] = useState("")
    const [filtroAtualizado, setFiltroAtualizado] = useState([])
    const [vetCurso, setVetCurso] = useState([])
    const [vetAluno, setVetAluno] = useState([])

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

    const dataFromAPI = async () => {
        await axios(urlAPICursos)
            .then(resp => {
                setDataAtualizada(true)
                setVetCurso(resp.data)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const dataFromAPIalunos = async () => {
        await axios(urlApiAlunos)
            .then(resp => {
                setDataAtualizada(true)
                setVetAluno(resp.data)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const buscarAlunos = async (value) => {
        setSearchInput(value)
        if (value !== '') {
            const AlunosFiltrados = vetAluno.filter((aluno) => {
                return Object.values(aluno).join("").toLowerCase().includes(value.toLowerCase())
            })
            setFiltroAtualizado(AlunosFiltrados)
        }
        else
            setFiltroAtualizado(vetAluno)
    }

    useEffect(() => {
        if (dataAtualizada) {
            dataFromAPI()
            dataFromAPIalunos()
            setDataAtualizada(false)
        }
    }, [dataAtualizada])


    return (
        <>
            <div>
                <div className="text-center duration-75 rounded-lg">
                    <div className="flex items-center justify-between pl-10 py-10">
                        <select name="codCurso" onChange={(e) => { buscarAlunos(e.target.value) }}>
                            <option name="initialValue" value="">Escolha um Curso</option>
                            {vetCurso.map(
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
                    </div>
                    {searchInput.length > 1 ? (
                        <div className="flex flex-wrap gap-5 w-screen items-center justify-between py-10 px-60 rounded-lg">
                            {filtroAtualizado.map((datas) => {
                                return (
                                    <div key={datas.id} className="flex flex-wrap p-5 shadow-2xl shadow-blue-700 h-[370px] rounded-lg">
                                        <div className="">
                                            <div className="">
                                                <div className="w-12/12 items-center self-center place-items-center">
                                                    <img src={`https://avatars.dicebear.com/api/${ramdomAvatar()}/${getRandomLetter()}.svg`} alt={datas.nome} />
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
                    ) : (
                        <div className="flex flex-wrap gap-5 w-screen items-center justify-between py-10 px-60 rounded-lg">
                            {vetAluno.map((datas) => {
                                return (
                                    <div key={datas.id} className="flex flex-wrap p-5 shadow-2xl shadow-blue-700 h-[370px] rounded-lg">
                                        <div className="">
                                            <div className="">
                                                <div className="w-12/12 items-center self-center place-items-center">
                                                    <img src={`https://avatars.dicebear.com/api/${ramdomAvatar()}/${getRandomLetter()}.svg`} alt={datas.nome} />
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
                    )}
                </div>
            </div>
        </>
    )
}

export default Carometro
