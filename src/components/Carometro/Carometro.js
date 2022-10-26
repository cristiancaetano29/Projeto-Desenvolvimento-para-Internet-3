import React, { useState, useEffect } from "react";
import axios from "axios";
//import './Carometro.css';

const Carometro = () => {
    const urlApiAlunos = "http://localhost:5035/api/controller"
    const [data, setData] = useState([])
    const [dataAtualizada, setDataAtualizada] = useState(true)
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
        <div className="text-center duration-75 rounded-lg">
            <div className="flex flex-wrap gap-5 w-screen items-center justify-between py-10 px-60 rounded-lg">
                {data.map((datas) => {
                    return (
                            <div key={datas.id} className="flex flex-wrap p-5 shadow-2xl shadow-blue-700 h-[370px] rounded-lg">
                                <div className="">
                                <div className="">
                                    <div className="w-12/12 items-center self-center place-items-center">
                                        <img src={`https://avatars.dicebear.com/api/bottts/${getRandomLetter()}.svg`} alt={datas.nome}/>
                                    </div>
                                </div>

                                <div className="flex flex-col flex-wrap w-[180px] pt-5 gap-3 text-left">
                                    <span className="text-xl font-medium">{datas.nome}</span>
                                    <span className="font-medium">RA: {datas.ra}</span>
                                    <span className="">Curso: {datas.ra}</span>
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