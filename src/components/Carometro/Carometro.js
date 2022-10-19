import React, { useState, useEffect } from "react";
import axios from "axios";
//import './Carometro.css';

const Carometro = () => {
    const urlApiAlunos = "http://localhost:5035/api/controller"
    const [data, setData] = useState([])
    const [dataAtualizada, setDataAtualizada] = useState(true)
    const avatar = ['adventurer', 'micah', 'bottts', 'adventurer-neutral', 'pixel-art']

    function ramdomAvatar() {
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
        //     <div class="flex justify-center justify-items-center w-screen h-[300px] grid gap-5 grid-cols-4 py-5">
        //         {data.map((datas) => {
        //             return (
        //                 <div key={datas.id} class="flex flex-col items-center justify-center w-6/12 bg-white border border-gray-300 rounded-xl">
        //                     <div class="relative w-[80%] h-[140px] flex shrink-0">
        //                         <div class="w-[100%] h-[100%] flex items-center justify-center">
        //                             <img src={imgURL()} alt={datas.nome} class="absolute left-0 top-0 w-[100%] h-[90%] transition duration-50 items-center pt-5 " loading="lazy" />
        //                         </div>
        //                     </div>

        //                     <div class="flex flex-col wrap font-bold items-center text-left justify-items-stretch w-[300px] h-[150px]">
        //                         <span class="text-xl mt-2 justify-self-start text-left">{datas.nome}</span>
        //                         <span class=" text-lg font-semibold text-blue-600 mt-2">RA: {datas.ra}</span>
        //                         <span class="text-lg font-semibold text-blue-600 mt-2">Curso: {datas.ra}</span>
        //                     </div>
        //                 </div>
        //             )
        //         })}
        // </div>
        // <>
        //     <main>
        //         <div>
        //             <div class="cards">
        //                 <div class="content">
        //                     {data.map((carometro) => (
        //                         <div key={carometro.id}>
        //                             <div className="card-content">
        //                                 <img class="w-full" src={imgURL()} alt="Avatar" />
        //                                 <div>
        //                                     <p>{carometro.ra}</p>
        //                                     <p>{carometro.nome}</p>
        //                                     <p>Curso: {carometro.codCurso}</p>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     ))}
        //                 </div>
        //             </div>
        //         </div>
        //     </main>
        // </>
        <div className="text-center duration-75	rounded-lg">
            <div className="flex gap-5 w-full items-center justify-between py-10 px-60">
                {data.map((datas) => {
                    return (
                        <main className="grid grid-cols-4 gap-20">
                            <div key={datas.id} className="flex  p-5 shadow-2xl shadow-blue-700 w-[200px] h-[350px]">
                                <div className="grid-cols-4">
                                <div className="">
                                    <div className="w-9/12 items-center self-center place-items-center">
                                        <img src={imgURL()} alt={datas.nome} className="" loading="lazy" />
                                    </div>
                                </div>

                                <div className="flex flex-col flex-wrap w-[180px] pt-5 gap-3 text-left">
                                    <span className="text-teal-500 font-medium">{datas.nome}</span>
                                    <span className="font-medium">RA: {datas.ra}</span>
                                    <span className="">Curso: {datas.ra}</span>
                                </div>
                            </div>
                        </div>
                        </main>
                    )
                })}
            </div>
        </div>
    )
}

export default Carometro