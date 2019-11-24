import React, { useState } from "react";
import api from '../../service/api';

export default function Register({ history }) {
    const [inputs, setInputs] = useState({})

    async function handleSubmit(event) {
        event.preventDefault();
        
        //eslint-disable-next-line
        const response = await api.post('/sessions', inputs)
        
        history.push('/');
    }

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.id]: event.target.value }));
    }

    return (
        <>
            <p>
                Ofereça <strong>spots</strong>  para programadores e encontre  <strong>talentos</strong>  para sua empresa
            </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Seu melhor email"
                    value={inputs.email}
                    onChange={handleInputChange}
                />
                <label htmlFor="password">Senha</label>

                <input
                    type="password"
                    id="password"
                    placeholder="Senha"
                    value={inputs.password}
                    onChange={handleInputChange}

                />
                <button className="btn" type="submit" >Entrar</button>
            </form>
        </>

    );
}