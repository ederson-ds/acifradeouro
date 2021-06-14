import Head from "next/head";
import Conteudo from "../components/Conteudo";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Layout({ children, user }) {
    return (
        <>
            <Head>
                <title>A Cifra de Ouro</title>
                <meta name="description" content="Descubra e resolva enigmas" />
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                    integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </Head>
            <div id="body">
                <Navbar user={user} />
                <Sidebar user={user} />
                <Conteudo user={user}>{children}</Conteudo>
            </div>
        </>
    );
}

export default Layout;
