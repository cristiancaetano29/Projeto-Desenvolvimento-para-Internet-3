import React from "react";
import { Routes, Route,  } from "react-router-dom";
import Main from "./components/template/main/Main";
import CrudAluno from "./components/CrudAluno/CrudAluno";
import Cursos from "./components/Cursos/Cursos";
import Carometro from "./components/Carometro/Carometro";
import Imagem from "./components/Imagem/imagem";


const Rotas = () => {
    return(
        <Routes>
            <Route exact path = '/'
                element={
                    <Main title = "Bem Vindo!">
                        <div>Cadastro de alunos, cursos e carômetro</div>
                    </Main>
                }/>
            <Route path = '/alunos' element={<CrudAluno />}/>
            <Route path = '/cursos' element = {<Cursos />} />
            <Route path = '/carometro' element = {<Carometro />} />
            <Route path = '/img' element = {<Imagem />} />
            <Route path="*" element={
                <Main title="Algo deu Errado">
                    <div>Página Não Encontrada, Tente Novamente!</div>
                </Main>
            } /> 
        </Routes>
    )
}

export default Rotas;