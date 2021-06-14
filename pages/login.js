import { server } from "../config";
import Router from "next/router";

export default function Cadastro() {
    const login = async (e) => {
        e.preventDefault();
        const { email, senha } = e.target;
        const res = await fetch(`${server}/api/login`, {
            body: JSON.stringify({
                email: email.value,
                senha: senha.value,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        const data = await res.json();
        if (data.sucesso) {
            Router.push("/fase1");
        } else {
            alert("Login Inválido");
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={login}>
                <label htmlFor="email">Email</label>
                <input id="email" maxLength="80" type="text" name="email" />
                <br />
                <label htmlFor="senha">Senha</label>
                <input id="senha" maxLength="50" type="password" name="senha" />
                <br />
                <button type="submit" id="btnCadastrar">
                    Logar
                </button>
            </form>
        </>
    );
}
