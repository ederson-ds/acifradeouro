import Link from "next/link";

export default function Home() {
    return (
        <>
            <h1>A Cifra de Ouro</h1>
            <p>
                Tente descobrir os enigmas por trás da cifra de ouro, para isso
                você precisará estudar e desvendar cada fase,{" "}
                <Link href="/cadastro">
                    <a>cadastre-se</a>
                </Link>{" "}
                para começar a jogar.
            </p>
        </>
    );
}
