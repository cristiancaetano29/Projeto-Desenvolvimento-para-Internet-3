import { useState, useEffect } from "react";
import axios from "axios";

const Imagem = () => {
    const urlApiAlunos = "http://localhost:5035/api/ImageUploaderTest/GetImages2/1"
    const [data, setDada] = useState([])

    const dataFromAPI = async () => {
        await axios(urlApiAlunos)
            .then(resp => {
                setDada(resp.data)
            })
            .catch(error => {
                console.error(error)
            })
    }

    useEffect(() => {
        dataFromAPI()
        console.log(data)
    }, [])


    return(
        <div>
            <div>
                <img src=""/>
            </div>
        </div>
    )
}

export default Imagem