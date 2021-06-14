import "../styles/globals.css";
import Layout from "../components/Layout";
import { server } from "../config";
import nookies from "nookies";

function MyApp({ Component, pageProps, user }) {
    return (
        <Layout user={user}>
            <Component {...pageProps} />
        </Layout>
    );
}

MyApp.getInitialProps = async ({ ctx }) => {
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
    return { user: data.data };
};

export default MyApp;
