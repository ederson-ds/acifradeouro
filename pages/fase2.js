import router from "next/router";
import { server } from "../config";
import nookies from "nookies";

export default function Fase2({ user }) {
    const ok = async (e) => {
        e.preventDefault();
        var { codigo } = e.target;
        if (!codigo.value) {
            alert("Digite um código");
            return;
        }
        codigo.value = codigo.value.toLowerCase();
        const res = await fetch(`${server}/api/tentarcodigo`, {
            body: JSON.stringify({
                fase: 2,
                codigo: codigo.value,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        const data = await res.json();
        if (data.sucesso) {
            router.push(data.proximafase);
        } else {
            alert(data.mensagem);
            router.push("/fase2");
        }
    };
    var faseAtual = 0;
    var input = "";
    var conteudo = "Você não deveria estar aqui";
    if (user && user.faseatual > 1) {
        faseAtual = user.faseatual;
        if (faseAtual > 2) {
            input = (<>Fase completa! Resposta: {<b>50</b>}</>);
        } else {
            input = (
                <div
                    style={{ margin: "auto", width: "150px", display: "flex" }}
                >
                    <form onSubmit={ok} style={{ display: "flex" }}>
                        <input
                            type="text"
                            name="codigo"
                            style={{
                                width: "150px",
                                textTransform: "lowercase",
                            }}
                        />
                        <button type="submit">OK</button>
                    </form>
                </div>
            );
        }
        conteudo = (
            <>
                <p>Números binários!</p>
                <p>É possível converte-los acessando o link a esquerda em <b>cifras ou conversões</b></p>
                <p>
                    110010
                </p>
                {input}
            </>
        );
    }
    return <>{conteudo}</>;
}

export async function getServerSideProps(ctx) {
    const cookies = nookies.get(ctx);
    const { email, senha } = cookies;
    if (email == null || senha == null) {
        return { props: { user: null } };
    }
    const response = await fetch(`${server}/api/login`, {
        body: JSON.stringify({
            email: email,
            senha: senha,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    });
    const data = await response.json();
    return { props: { user: data.data } };
}
