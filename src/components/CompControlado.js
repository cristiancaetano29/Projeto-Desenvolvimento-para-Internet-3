import React from "react";
import { useState } from "react";

const CompControlado = () => {

    const [nome, setNome] = ("Valor Inicial");

    function leNome (e) {
        setNome(e.target.value);
    }

    function exibeNome() {
        alert(nome);
    }

    return(
        <div style={{ fontFamily: 'Silkscreen' }}>
            <h1>Exemplo Componente Controlado</h1>
            <label>
                Nome:
                <input type="text" value={nome} onChange={leNome}/>
                <button onClick={exibeNome}>Exibe</button>
            </label>

        </div>
    );
}

export default CompControlado;