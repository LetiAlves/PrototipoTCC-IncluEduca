"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoBookOutline, IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { CircleAlert, CircleCheck } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      const response = await fetch("http://localhost:3001/login", {
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

        localStorage.setItem(
          "token",
          json.token
        );

        localStorage.setItem(
          "usuario",
          JSON.stringify(json.user)
        );

        setEmail("");
        setPassword("");

        setError("");
        setSuccess("Login realizado com sucesso!");

        setTimeout(() => {
          router.push("/selectPerfil");
        }, 1500);
      } else{

        setSuccess("");
        setError(
          json.message || "E-mail ou senha incorretos."
        );
      }
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);

      setSuccess("");
      setError("Erro ao conectar com o servidor.");
    }
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

            {error && (
              <div className="bg-red-100 border border-red-500 text-red-700 p-3 rounded">
                {error}
              </div>
              )}

              {success && (
                <div className="bg-green-100 border border-green-500 text-green-700 p-3 rounded">
                  {success}
                </div>
            )}

            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="educador@escola.com"
            />

            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
            />

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