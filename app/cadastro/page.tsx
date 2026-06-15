"use client";

import "./pageCadastro.scss";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoBookOutline, IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export default function Cadastro() {
    const router = useRouter();

    const [darkMode, setDarkMode] = useState(false);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [serieEscolar, setSerieEscolar] = useState("");
    const [diagnostico, setDiagnostico] = useState("");
    const [nivel, setNivel] = useState("");

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    async function cadastrar(e: React.FormEvent) {
        e.preventDefault();

        const dados = {
            nome,
            email,
            password,
            serie_escolar: serieEscolar,
            diagnostico,
            nivel,
        };

        console.log(dados);

        // Aqui você faz o POST para sua API
        /*
        await fetch("http://localhost:3001/cadastro", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        });
        */

        router.push("/");
    }

    return (
        <>
            <header className="topo">
                <button
                    className="btn-tema"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
                </button>
            </header>

            <main className="container-login">
                <div className="bloco-login">
                    <div className="titulo">
                        <div className="icone">
                            <IoBookOutline />
                        </div>

                        <h1>IncluEduca</h1>
                        <p>Cadastro de aluno</p>
                    </div>

                    <form onSubmit={cadastrar} className="formulario">

                        <label>Nome</label>
                        <input
                            type="text"
                            placeholder="Nome completo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <label>E-mail</label>
                        <input
                            type="email"
                            placeholder="aluno@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <label>Série Escolar</label>
                        <select
                            value={serieEscolar}
                            onChange={(e) => setSerieEscolar(e.target.value)}
                        >
                            <option value="">Selecione a série</option>
                            <option value="1º Ano">1º Ano</option>
                            <option value="2º Ano">2º Ano</option>
                            <option value="3º Ano">3º Ano</option>
                            <option value="4º Ano">4º Ano</option>
                            <option value="5º Ano">5º Ano</option>
                        </select>

                        <label>Diagnóstico</label>
                        <select
                            value={diagnostico}
                            onChange={(e) => setDiagnostico(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            <option value="TDAH">TDAH</option>
                            <option value="TEA">TEA</option>
                        </select>

                        <label>Nível de Suporte</label>
                        <select
                            value={nivel}
                            onChange={(e) => setNivel(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            <option value="1">Nível 1</option>
                            <option value="2">Nível 2</option>
                            <option value="3">Nível 3</option>
                        </select>

                        <button type="submit">
                            Cadastrar
                        </button>
                    </form>

                    <span className="rodape">
                        Ambiente seguro e acessível para educadores
                    </span>
                </div>
            </main>
        </>
    );
}