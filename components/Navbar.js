import Link from "next/link";

export default function Navbar({ user }) {
    let menus = [];
    menus = [
        <Link href="/">
            <a className="active">Home</a>
        </Link>,
        <Link href="/cadastro">
            <a>Cadastrar</a>
        </Link>,
        <Link href="/login">
            <a>Login</a>
        </Link>,
    ];
    if (user) {
        menus = [
            <Link href="/">
                <a className="active">Home</a>
            </Link>,
            <Link href="/sair">
                <a>Sair</a>
            </Link>
        ];
    }
    return (
        <>
            <div className="topnav" id="myTopnav">
                {menus.map((menu, key) => (
                    <span key={key}>{menu}</span>
                ))}
            </div>
        </>
    );
}
