import React, { useState, useEffect } from "react";
import axios from "axios";
import './Carometro.css';

const Carometro = () => {
    function geraStringAleatoria(tamanho) {
        let stringAleatoria = '';
        let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < tamanho; i++) {
            stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return stringAleatoria;
    }

    let imgURL = `https://avatars.dicebear.com/api/adventurer/${geraStringAleatoria(8)}.svg`
    let imgNova = []

    const urlApiCursos = "http://localhost:5035/api/controller"

    const [data, setData] = useState([])
    const [imgRam, setImgRam] = useState([])

    const dataFromAPI = async () => {
        await axios(urlApiCursos)
            .then(resp => {
                setData(resp.data)
            })
            .catch(error => {
                console.error(error)
            })

    }

    useEffect(() => {
        dataFromAPI()
        setImgRam(geraStringAleatoria())
    }, [data])
/*
    useEffect(() => {
        //console.log(imgNew)
        setImgRam(imgNew)
    }, [])
*/
    //console.log(imgRam)
    

    return (
        // <div className="grid gap-6 grid-cols-5">
        // <div className="flex flex-row justify-between items-center py-3 font">
        <div className="card">
            <div>
            <div>
                {
                    data.map((datas) => {
                        return (
                            <div key={datas.id}>
                                <div class="max-w-sm rounded overflow-hidden shadow-lg">
                                    <img class="w-full" src={imgURL} alt="Avatar" />
                                        <div class="flex flex-col flex wrap px-6 pt-4 pb-2">
                                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{datas.ra}</span>
                                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{datas.nome}</span>
                                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{datas.codCurso}</span>
                                        </div>
                                </div>
                            </div>
                        )
                    })
                }
                 </div>
            </div>
        </div>
    )
}

export default Carometro