"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    IoMoonOutline,
    IoSunnyOutline,
    IoArrowBackOutline,
    IoBookOutline,
} from "react-icons/io5";

import { LuPuzzle } from "react-icons/lu";
import { PiLightningBold } from "react-icons/pi";
import Link from "next/link";

export default function PerfilAluno() {
    const router = useRouter();

    const [darkMode, setDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState(16);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }

        document.documentElement.style.fontSize = `${fontSize}px`;
    }, [darkMode, fontSize]);

    return (
        <>
            {/* TOPO FIXO */}
            <header className="topo">
                <div className="lado-esquerdo">
                    <button className="btn-voltar" onClick={() => router.back()}>
                        <IoArrowBackOutline />
                    </button>
                    <IoBookOutline />
                    <h1>IncluEduca</h1>
                </div>

                <div className="acoes-topo">
                    <button onClick={() => setFontSize(fontSize - 1)}>−</button>

                    <span>{fontSize}</span>

                    <button onClick={() => setFontSize(fontSize + 1)}>+</button>

                    <button
                        className="btn-tema"
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
                    </button>
                </div>
            </header>

            {/* CONTEÚDO */}
            <main className="container-perfis">
                <div className="conteudo">
                    <h2>Selecione o perfil do aluno</h2>

                    <p>
                        Escolha o tipo de necessidade para adaptar o ambiente de estudo.
                    </p>

                    {/* CARD TEA */}
                    <Link href="/tea">
                        <div className="card tea">
                            <div className="icone-card">
                                <LuPuzzle />
                            </div>

                            <div>
                                <h3>TEA</h3>

                                <span>
                                    Transtorno do Espectro Autista — Ambiente estruturado,
                                    previsível e com baixa estimulação visual.
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* CARD TDAH */}
                    <Link href="/tdah">
                        <div className="card tdah">
                            <div className="icone-card">
                                <PiLightningBold />
                            </div>

                            <div>
                                <h3>TDAH</h3>

                                <span>
                                    Transtorno de Déficit de Atenção e Hiperatividade — Ambiente
                                    dinâmico com gamificação e progresso visual.
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            </main>
        </>
    );
}