import React, { useState } from "react";
import api from "../../service/api";
import { Link } from "react-router-dom";

export default function Login({ history }) {
  const [inputs, setInputs] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post("/login", inputs);

    const { token } = response.data;

    if (token) {
      localStorage.setItem("token", token);

      history.push("/dashboard");
    }
  }

  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.id]: event.target.value }));
  };

  return (
    <>
      <p>
        Entre com seu <strong>email</strong> e <strong>senha</strong>.
      </p>
      <p>
        Ainda não está cadastrado? clique <Link to="/register">aqui</Link>.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={inputs.email}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Senha</label>

        <input
          type="password"
          id="password"
          value={inputs.password}
          onChange={handleInputChange}
        />
        <button className="btn" type="submit">
          Entrar
        </button>
      </form>
    </>
  );
}
