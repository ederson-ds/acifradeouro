import { PrismaClient } from "@prisma/client";
import { setCookie } from "nookies";

let prisma;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }

    prisma = global.prisma;
}

export default async (req, res) => {
    const { email, senha } = req.body;
    if (email == null || senha == null)
        return res.status(200).json({ sucesso: false });

    const login = await prisma.user.findFirst({
        where: {
            email: email,
            senha: senha,
        },
    });
    if (login) {
        setCookie({ res }, "email", email, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
        });
        setCookie({ res }, "senha", senha, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
        });
        res.status(200).json({ sucesso: true, data: login });
    } else res.status(200).json({ sucesso: false });
};
