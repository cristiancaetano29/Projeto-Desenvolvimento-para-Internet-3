import React, { useState, useEffect } from "react";
import axios from "axios";
import './Carometro.css';

const Carometro = () => {
    const urlApiAlunos = "http://localhost:5035/api/controller"
    const [data, setData] = useState([])
    const [dataAtualizada, setDataAtualizada] = useState(true)
    const avatar = ['adventurer', 'micah', 'personas', 'bottts', 'adventurer-neutral', 'avataaars','pixel-art']
    
   function ramdomAvatar(){
        let tamanho = avatar.length
        let av = Math.floor(Math.random() * tamanho)
        let rd = avatar[av]
        return rd
    }

    function geraStringAleatoria(tamanho) {
        let stringAleatoria = '';
        let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < tamanho; i++) {
            stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return stringAleatoria;
    }

    let imgURL = () => `https://avatars.dicebear.com/api/${ramdomAvatar()}/${geraStringAleatoria(8)}.svg`

    const dataFromAPI = async () => {
        await axios(urlApiAlunos)
            .then(resp => {
                setDataAtualizada(true)
                setData(resp.data)
            })
            .catch(error => {
                console.error(error)
            })
    }
    

    useEffect(() => {
        if (dataAtualizada) {
            dataFromAPI()
            setDataAtualizada(false)   
        }
    }, [dataAtualizada])

    return (
        // <div className="grid gap-6 grid-cols-5">
        // <div className="flex flex-row justify-between items-center py-3 font">
        {/* <div className="card">
                {
                    data.map((datas) => {
                        return (
                            <div className="grid">
                                <img class=" flex w-[50%] justify-center items-center" src={imgURL()} alt={datas.nome} />
                                <div key={datas.id}>
                                    <div class="max-w-sm rounded overflow-hidden shadow-lg">
                                        <div class="flex flex-col flex wrap px-6 pt-4 pb-2">
                                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{datas.ra}</span>
                                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{datas.nome}</span>
                                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{datas.codCurso}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div> */},
            <div class="flex justify-center justify-items-center w-screen h-[300px] grid gap-5 grid-cols-4 py-5">
                {data.map((datas) => {
                    return (
                        <div key={datas.id} class="flex flex-col items-center justify-center w-6/12 bg-white border border-gray-300 rounded-xl">
                            <div class="relative w-[80%] h-[140px] flex shrink-0">
                                <div class="w-[100%] h-[100%] flex items-center justify-center">
                                    <img src={imgURL()} alt={datas.nome} class="absolute left-0 top-0 w-[100%] h-[90%] transition duration-50 items-center pt-5 " loading="lazy" />
                                </div>
                            </div>

                            <div class="flex flex-col wrap font-bold items-center text-left justify-items-stretch w-[300px] h-[150px]">
                                <span class="text-xl mt-2 justify-self-start text-left">{datas.nome}</span>
                                <span class=" text-lg font-semibold text-blue-600 mt-2">RA: {datas.ra}</span>
                                <span class="text-lg font-semibold text-blue-600 mt-2">Curso: {datas.ra}</span>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default Carometro