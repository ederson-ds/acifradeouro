import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }

    prisma = global.prisma;
}

const retirarBarraDeOuro = async (user) => {
    let barrasdeouro = user.barrasdeouro - 1;
    const updateUser = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            barrasdeouro: barrasdeouro,
        },
    });
};

const passarDeFase = async (user) => {
    let proximafase = user.faseatual + 1;
    const updateUser = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            faseatual: proximafase,
        },
    });
};

export default async (req, res) => {
    const { fase, codigo } = req.body;
    const { email, senha } = req.cookies;
    const user = await prisma.user.findFirst({
        where: {
            email: email,
            senha: senha,
        },
    });
    if (user.barrasdeouro == 0)
        return res.status(200).json({
            sucesso: false,
            mensagem: "Você não tem mais barras de ouro!",
        });
    if (fase == 1) {
        if (codigo == "enigma") {
            passarDeFase(user);
            res.status(200).json({ sucesso: true, proximafase: "/fase2" });
        } else {
            retirarBarraDeOuro(user);
            res.status(200).json({
                sucesso: false,
                mensagem: "Código incorreto!",
            });
        }
    } else if (fase == 2) {
        if (codigo == "50") {
            passarDeFase(user);
            res.status(200).json({ sucesso: true, proximafase: "/fase3" });
        } else {
            retirarBarraDeOuro(user);
            res.status(200).json({
                sucesso: false,
                mensagem: "Código incorreto!",
            });
        }
    } else if(fase == 3) {
        if (codigo == "9463590") {
            passarDeFase(user);
            res.status(200).json({ sucesso: true, proximafase: "/fase4" });
        } else {
            retirarBarraDeOuro(user);
            res.status(200).json({
                sucesso: false,
                mensagem: "Código incorreto!",
            });
        }
    }
};
