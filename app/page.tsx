"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoBookOutline, IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export default function Home() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  function entrar(e: React.FormEvent) {
    e.preventDefault();
    router.push("/selectPerfil");
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
            <input type="email" placeholder="educador@escola.com" />

            <label>Senha</label>
            <input type="password" placeholder="Senha" />

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