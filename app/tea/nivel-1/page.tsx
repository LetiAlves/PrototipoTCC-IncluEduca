"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./nivel1.scss";

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
import { PiTrophyThin } from "react-icons/pi";

export default function Nivel1TEA() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(15);

  // MODO FOCO
  const [focusMode, setFocusMode] = useState(false);

  // BLOCO ATIVO
  const [blocoAtual, setBlocoAtual] = useState(0);

  // BLOCO CONCLUIDO CHECK
  const [concluidos, setConcluidos] = useState<number[]>([]);

  const blocos = [
    {
      titulo: "O que é paisagem?",
      texto:
        "Paisagem é tudo aquilo que conseguimos observar em um lugar. As paisagens fazem parte do nosso dia a dia e podem ser naturais ou modificadas pelas pessoas.",

      imagem: "/geografia/paisagem-natural-cultural.webp",
    },

    {
      titulo: "Paisagem natural",
      texto:
        "A paisagem natural é formada pelos elementos da natureza, como rios, árvores, montanhas, florestas e praias. Esses elementos existem sem a construção humana.",

      imagem: "/geografia/paisagem-natural.jpeg",
    },

    {
      titulo: "Paisagem humanizada",
      texto:
        "A paisagem humanizada é modificada pelas pessoas. Casas, prédios, ruas, pontes e carros são exemplos de mudanças feitas pelo ser humano no ambiente.",

      imagem: "/geografia/paisagem-humanizada.webp",
    },

    {
      titulo: "Observando o lugar onde vivemos",
      texto:
        "O bairro onde moramos possui diferentes tipos de paisagem. Podemos encontrar elementos naturais, como árvores e praças, e elementos humanizados, como avenidas e construções.",

    },

    {
      titulo: "Atividade",
      texto:
        "Observe o lugar onde você mora. Quais elementos naturais e humanizados você consegue identificar?",

    },
  ];

  function concluirBloco() {
    // marca bloco atual como concluído
    setConcluidos((prev) => [...prev, blocoAtual]);

    // avança para o próximo
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

      {/* CONTEÚDO */}
      <main className="container-aula">
        <div className="conteudo-aula">
          {/* TOPO */}
          <div className="topo-conteudo">
            <span className="tag">TEA · Nível 1</span>
            <span className="tag">Materia de Geografia</span>

            <div className="acoes-aula">
              <button onClick={() => setFocusMode(!focusMode)}>
                <RiFocus3Line />
                {focusMode ? "Sair do foco" : "Modo concentração"}
              </button>

              {/* <button>
                <IoVolumeHighOutline />
                Ouvir
              </button> */}
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

            {concluidos.length === blocos.length && (
              <div className="mensagem-concluida">
                <PiTrophyThin />
                <span>Parabéns! Lição concluída!</span>
              </div>
            )}
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
                <div className="cabecalho-bloco">
                  <div className="circulo">
                    {concluidos.includes(index) && (
                      <IoCheckmarkCircle className="icone-check" />
                    )}
                  </div>

                  <h3>{bloco.titulo}</h3>
                </div>

                <p>{bloco.texto}</p>

                {bloco.imagem && (
                  <img
                    src={bloco.imagem}
                    alt={bloco.titulo}
                    className="imagem-bloco"
                  />
                )}

                {index === blocoAtual && (
                  <button
                    className="btn-concluir"
                    onClick={concluirBloco}
                  >
                    Concluir bloco
                    <IoCheckmarkOutline />
                  </button>
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