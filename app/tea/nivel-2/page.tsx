"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./nivel2.scss";

import {
  IoArrowBackOutline,
  IoMoonOutline,
  IoSunnyOutline,
  IoVolumeHighOutline,
  IoCheckmarkCircle,
  IoCheckmarkOutline,
} from "react-icons/io5";

import { LuBookOpen } from "react-icons/lu";
import { RiFocus3Line } from "react-icons/ri";

export default function Nivel2TEA() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);

  // FOCO COMEÇA ATIVADO
  const [focusMode, setFocusMode] = useState(true);

  const [fontSize, setFontSize] = useState(16);

  const [blocoAtual, setBlocoAtual] = useState(0);

  const [concluidos, setConcluidos] = useState<number[]>([]);

  const blocos = [
    {
      titulo: "A água faz parte da natureza",
      texto:
        "A água é muito importante para a vida. Nós usamos água para beber, tomar banho, cozinhar e cuidar das plantas.",

      imagem: "/geografia/importancia-agua.webp",
    },

    {
      titulo: "Água no estado líquido",
      texto:
        "No estado líquido, a água pode ser encontrada em rios, mares, chuvas e copos de água. Ela consegue mudar de forma dependendo do recipiente.",

    },

    {
      titulo: "Água no estado sólido",
      texto:
        "Quando a água fica muito gelada, ela se transforma em gelo. O gelo é o estado sólido da água.",

    },

    {
      titulo: "Água no estado gasoso",
      texto:
        "Quando a água é aquecida, ela pode virar vapor. O vapor sobe para o ar e faz parte das nuvens.",

    },

    {
      titulo: "Atividade",
      texto:
        "Observe as imagens e diga: em qual estado está a água em um cubo de gelo?",

      imagem: "/geografia/estado-agua.avif",
    },
  ];

  function concluirBloco() {
    setConcluidos((prev) => [...prev, blocoAtual]);

    if (blocoAtual < blocos.length - 1) {
      setBlocoAtual(blocoAtual + 1);
    }
  }

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

      {/* CONTAINER */}
      <main className="container-aula">
        <div className="conteudo-aula">
          {/* TOPO */}
          <div className="topo-conteudo">
            <span className="tag">TEA · Nível 2</span>
            <span className="tag">Geografia</span>
            <div className="acoes-aula">
              <button onClick={() => setFocusMode(!focusMode)}>
                <RiFocus3Line />
                {focusMode ? "Sair do foco" : "Modo concentração"}
              </button>

              <button>
                <IoVolumeHighOutline />
                Ouvir
              </button>
            </div>
          </div>

          {/* PROGRESSO */}
          <div className="barra-progresso">
            <div className="texto-progresso">
              <span>Progresso</span>

              <span>
                {blocoAtual}/{blocos.length} blocos
              </span>
            </div>

            <div className="linha">
              <div
                className="preenchimento"
                style={{
                  width: `${(blocoAtual / (blocos.length - 1)) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* BLOCOS */}
          <div className={`blocos ${focusMode ? "focus-mode" : ""}`}>
            {blocos.map((bloco, index) => (
              <div
                key={index}
                className={`bloco
                  ${index === blocoAtual ? "ativo" : ""}
                  ${concluidos.includes(index) ? "concluido" : ""}
                  ${focusMode && index !== blocoAtual
                    ? "desfocado"
                    : ""
                  }
                `}
              >
                {/* CABEÇALHO */}
                <div className="cabecalho-bloco">
                  <div className="circulo">
                    {concluidos.includes(index) && (
                      <IoCheckmarkCircle className="icone-check" />
                    )}
                  </div>

                  <h3>
                    {index + 1}/5 {bloco.titulo}
                  </h3>
                </div>

                {/* SOMENTE BLOCO ATIVO MOSTRA TEXTO */}
                {index === blocoAtual && (
                  <>
                    <p>{bloco.texto}</p>

                    {bloco.imagem && (
                      <img
                        src={bloco.imagem}
                        alt={bloco.titulo}
                        className="imagem-bloco"
                      />
                    )}

                    <button
                      className="btn-concluir"
                      onClick={concluirBloco}
                    >
                      Concluir bloco
                      <IoCheckmarkOutline />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="footer-aula">
            <button
              className="btn-dashboard"
              onClick={() => router.push("/dashboard")}
            >
              <LuBookOpen />
              Dashboard do Educador
            </button>
          </div>
        </div>
      </main>
    </>
  );
}