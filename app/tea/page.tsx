"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  IoArrowBackOutline,
  IoMoonOutline,
  IoSunnyOutline,
} from "react-icons/io5";

export default function NivelTEA() {
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
      {/* TOPO */}
      <header className="topo">
        <div className="lado-esquerdo">
          <button className="btn-voltar" onClick={() => router.back()}>
            <IoArrowBackOutline />
          </button>

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
      <main className="container-niveis">
        <div className="conteudo">
          <span className="tag">TEA</span>

          <h2>Nível de suporte</h2>

          <p>
            Defina a intensidade das adaptações no ambiente de estudo.
          </p>

          {/* NÍVEL 1 */}
          <Link href="/tea/nivel-1">
            <div className="card-nivel">
              <div className="numero">1</div>

              <div>
                <h3>Nível 1</h3>

                <span>
                  Suporte leve — pequenas adaptações visuais e de organização.
                </span>
              </div>
            </div>
          </Link>

          {/* NÍVEL 2 */}
          <Link href="/tea/nivel-2">
            <div className="card-nivel">
              <div className="numero">2</div>

              <div>
                <h3>Nível 2</h3>

                <span>
                  Suporte moderado — simplificação de conteúdo e guias
                  adicionais.
                </span>
              </div>
            </div>
          </Link>

          {/* NÍVEL 3 */}
          <Link href="/tea/nivel-3">
            <div className="card-nivel">
              <div className="numero">3</div>

              <div>
                <h3>Nível 3</h3>

                <span>
                  Suporte severo — máxima simplificação e leitura assistida.
                </span>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}