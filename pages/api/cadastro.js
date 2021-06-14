import { PrismaClient } from "@prisma/client";
import { setCookie } from 'nookies';

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

    const userEmail = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    if (userEmail) {
        return res.status(200).json({
            sucesso: false,
            mensagem: "Este email já existe, faça o login!",
        });
    }
    setCookie({ res }, "email", email, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
    });
    setCookie({ res }, "senha", senha, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
    });
    const user = await prisma.user.create({
        data: { email: email, senha: senha, barrasdeouro: 5, faseatual: 1 },
    });
    res.status(200).json({ sucesso: true });
};
