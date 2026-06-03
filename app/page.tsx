"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoBookOutline, IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export default function Home() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();

    try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const json = await response.json();

    console.log("Resposta do backend:", json);

    if (json.success) {
      router.push("/selectPerfil");
    } else {
      alert("Email ou senha incorretos");
    }
  } catch (error) {
    console.error("Erro ao conectar com a API:", error);
    alert("Erro ao conectar com o servidor");
  }
    // router.push("/selectPerfil");
  }

  return (
    <>
      {/* TOPO FIXO */}
      <header className="topo">
        <button
          className="btn-tema"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
        </button>
      </header>

      {/* LOGIN */}
      <main className="container-login">
        <div className="bloco-login">
          <div className="titulo">
            <div className="icone">
              <IoBookOutline />
            </div>

            <h1>IncluEduca</h1>
            <p>Plataforma de acessibilidade educacional</p>
          </div>

          <form onSubmit={entrar} className="formulario">
            <label>E-mail</label>
            <input type="email" value={email} onChange={ (e) => setEmail(e.target.value)} placeholder="educador@escola.com" />

            <label>Senha</label>
            <input type="password" value={password} onChange={ (e) => setPassword(e.target.value)} placeholder="Senha" />

            <button type="submit">Entrar</button>
          </form>

          <span className="rodape">
            Ambiente seguro e acessível para educadores
          </span>
        </div>
      </main>
    </>
  );
}