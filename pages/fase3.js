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
                fase: 3,
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
            router.push("/fase3");
        }
    };
    var faseAtual = 0;
    var input = "";
    var conteudo = "Você não deveria estar aqui";
    if (user && user.faseatual > 2) {
        faseAtual = user.faseatual;
        if (faseAtual > 3) {
            input = <>Fase completa! Resposta: {<b>9463590</b>}</>;
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
                <center>
                    <p>120ABD4 + HZ2346</p>
                </center>
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
