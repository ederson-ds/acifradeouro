import Link from "next/link";

export default function Sidebar({ user }) {
    const fases = [];
    if (user) {
        var stringBarrasDeOuro = null;
        if (user.barrasdeouro == 1)
            stringBarrasDeOuro = user.barrasdeouro + " barra de ouro";
        else stringBarrasDeOuro = user.barrasdeouro + " barras de ouro";

        for (let i = 1; i <= user.faseatual; i++) {
            fases.push(<>Fase {i}</>);
        }
    }
    return (
        <div id="sidebar">
            <div className="texto">
                {fases.length != 0 ? (
                    <div>
                        <img src="barrasdeouro.png" width="32" />
                        <span
                            style={{
                                position: "relative",
                                marginLeft: "11px",
                                top: "-5px",
                            }}
                        >
                            {stringBarrasDeOuro}
                        </span>
                    </div>
                ) : (
                    <h2>Bem-vindo!</h2>
                )}

                {fases.length != 0 ? <h2>Fases</h2> : ""}
                {fases.map((fase, key) => (
                    <Link key={key} href={"/fase" + (key + 1)}>
                        <a style={{ display: "block" }}>{fase}</a>
                    </Link>
                ))}

                {fases.length != 0 ? <h2>Cifras ou conversões</h2> : ""}
                {fases.length > 1 ? (
                    <Link href={"/converterbinario"}>
                        <a style={{ display: "block" }}>Binário para decimal</a>
                    </Link>
                ) : (
                    ""
                )}
                {fases.length > 2 ? (
                    <Link href={"/letraparanumero"}>
                        <a style={{ display: "block" }}>Letras em número</a>
                    </Link>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
