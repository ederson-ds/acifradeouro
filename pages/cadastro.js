import { server } from "../config";
import Router from "next/router";

export default function Cadastro() {
    const cadastrar = async (e) => {
        e.preventDefault();
        const { email, senha, confirmarSenha } = e.target;
        const errorEmail = document.getElementById("errorEmail");
        const errorSenha = document.getElementById("errorSenha");
        const errorConfirmarSenha = document.getElementById(
            "errorConfirmarSenha"
        );
        var validoArray = [];
        if (!validateEmail(email.value)) {
            email.classList.add("error");
            errorEmail.style.display = "inline";
        } else {
            email.classList.remove("error");
            errorEmail.style.display = "none";
            validoArray.push(true);
        }

        if (senha.value.length < 6) {
            senha.classList.add("error");
            errorSenha.style.display = "inline";
        } else {
            senha.classList.remove("error");
            errorSenha.style.display = "none";
            validoArray.push(true);
        }

        if (senha.value != confirmarSenha.value) {
            confirmarSenha.classList.add("error");
            errorConfirmarSenha.style.display = "inline";
        } else {
            confirmarSenha.classList.remove("error");
            errorConfirmarSenha.style.display = "none";
            validoArray.push(true);
        }

        if (validoArray.length == 3) {
            const res = await fetch(`${server}/api/cadastro`, {
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
                alert(data.mensagem);
            }
        }
    };

    function validateEmail(email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <>
            <h1>Cadastrar nova conta</h1>
            <form onSubmit={cadastrar}>
                <label htmlFor="email">Email</label>
                <input id="email" maxLength="80" type="text" name="email" />
                <span
                    id="errorEmail"
                    style={{ display: "none", marginLeft: "10px" }}
                >
                    Digite um email válido
                </span>
                <br />
                <label htmlFor="senha">Senha</label>
                <input id="senha" maxLength="50" type="password" name="senha" />
                <span
                    id="errorSenha"
                    style={{ display: "none", marginLeft: "10px" }}
                >
                    Mínimo 6 caracteres para senha
                </span>
                <br />
                <label htmlFor="confirmarSenha">Confirmar senha</label>
                <input
                    id="confirmarSenha"
                    maxLength="50"
                    type="password"
                    name="confirmarSenha"
                />
                <span
                    id="errorConfirmarSenha"
                    style={{ display: "none", marginLeft: "10px" }}
                >
                    As senhas não conferem
                </span>
                <br />
                <button type="submit" id="btnCadastrar">
                    Cadastrar
                </button>
            </form>
        </>
    );
}
