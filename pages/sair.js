import Router from "next/router";
import nookies, { destroyCookie } from "nookies";
import { useEffect } from "react";

export default function Sair() {
    useEffect(() => {
        destroyCookie(null, "email");
        destroyCookie(null, "senha");
        Router.push("/");
    });
    return null;
}

export async function getServerSideProps(context) {
    nookies.destroy(context, "email");
    nookies.destroy(context, "senha");
    return {
        props: {}, // will be passed to the page component as props
    };
}
