"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "./nivel1Tdah.scss";

import {
  IoArrowBackOutline,
  IoMoonOutline,
  IoSunnyOutline,
  IoVolumeHighOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";

import { RiFocus3Line } from "react-icons/ri";
import { LuBookOpen, LuChartColumn } from "react-icons/lu";

export default function TDAHNivel1() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const [focusMode, setFocusMode] = useState(false);

  // BLOCO ATIVO
  const [blocoAtual, setBlocoAtual] = useState(0);

  // BLOCOS CONCLUÍDOS
  const [concluidos, setConcluidos] = useState<number[]>([]);

  const totalBlocos = 4;

  // CONCLUIR BLOCO
  function concluirBloco() {
    // evita duplicar
    if (!concluidos.includes(blocoAtual)) {
      setConcluidos((prev) => [...prev, blocoAtual]);
    }

    // vai para o próximo
    if (blocoAtual < totalBlocos - 1) {
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

  // PROGRESSO REAL
  const progresso =
    (concluidos.length / totalBlocos) * 100;

  const blocos = [
    {
      titulo: "O que é multiplicação?",
      texto:
        "A multiplicação é uma forma mais rápida de fazer somas repetidas. Em vez de somar o mesmo número várias vezes, usamos a multiplicação para facilitar os cálculos. Ela está presente em diversas situações do nosso dia a dia, como contar objetos, organizar grupos e calcular quantidades.",
    },

    {
      titulo: "Como funciona a multiplicação",
      texto:
        "Quando multiplicamos, juntamos grupos com a mesma quantidade. Por exemplo: 3 × 4 significa 3 grupos com 4 elementos em cada grupo. Também podemos pensar como 4 + 4 + 4, que resulta em 12. O símbolo × significa 'vezes'.",
    },

    {
      titulo: "Exemplo prático",
      texto:
        "Imagine que uma sala possui 5 mesas e cada mesa tem 4 cadeiras. Para descobrir o total de cadeiras, fazemos 5 × 4. O resultado é 20 cadeiras. A multiplicação ajuda a resolver problemas de maneira mais rápida e organizada.",
    },

    {
      titulo: "Atividade",
      texto:
        "Uma caixa possui 6 fileiras com 3 lápis em cada uma. Quantos lápis existem ao todo? Tente resolver usando multiplicação.",
    },
  ];

  return (
    <>
      {/* TOPO */}
      <header className="topo">
        <div className="lado-esquerdo">
          <button
            className="btn-voltar"
            onClick={() => router.back()}
          >
            <IoArrowBackOutline />
          </button>

          <h1>IncluEduca</h1>
        </div>

        <div className="acoes-topo">
          <button
            onClick={() =>
              setFontSize(fontSize - 1)
            }
          >
            −
          </button>

          <span>{fontSize}</span>

          <button
            onClick={() =>
              setFontSize(fontSize + 1)
            }
          >
            +
          </button>

          <button
            className="btn-tema"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode ? (
              <IoSunnyOutline />
            ) : (
              <IoMoonOutline />
            )}
          </button>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="container-aula">
        <div className="conteudo-aula">
          {/* TOPO */}
          <div className="topo-conteudo">
            <span className="tag tdah">
              TDAH · Nível 1
            </span>
            <span className="tag tdah">
              Matematica
            </span>
            <div className="acoes-aula">
              <button
                onClick={() =>
                  setFocusMode(!focusMode)
                }
              >
                <RiFocus3Line />

                {focusMode
                  ? "Sair do foco"
                  : "Modo concentração"}
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
                {concluidos.length}/
                {totalBlocos} blocos
              </span>
            </div>

            <div className="linha">
              <div
                className="preenchimento tdah"
                style={{
                  width: `${progresso}%`,
                }}
              ></div>
            </div>
          </div>

          {/* BLOCOS */}
          <div className="blocos">
            {blocos.map((bloco, index) => {
              const concluido =
                concluidos.includes(index);

              const ativo =
                index === blocoAtual;

              return (
                <div
                  key={index}
                  className={`bloco
                    ${ativo
                      ? "ativo tdah-borda"
                      : ""
                    }
                    ${focusMode && !ativo
                      ? "desfocado"
                      : ""
                    }
                    ${concluido
                      ? "concluido"
                      : ""
                    }
                  `}
                >
                  <div className="cabecalho-bloco">
                    <div
                      className={`circulo ${concluido
                        ? "circulo-check"
                        : ""
                        }`}
                    >
                      {concluido && (
                        <IoCheckmarkOutline />
                      )}
                    </div>

                    <h3>{bloco.titulo}</h3>
                  </div>

                  <p>{bloco.texto}</p>

                  {ativo && !concluido && (
                    <button
                      className="btn-concluir tdah-btn"
                      onClick={
                        concluirBloco
                      }
                    >
                      Concluir bloco
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* DESEMPENHO */}
          <div className="painel-desempenho">
            <div className="titulo-desempenho">
              <LuChartColumn />

              <h3>Seu desempenho</h3>
            </div>

            <div className="cards-desempenho">
              <div className="card-status">
                <h4>
                  {concluidos.length}
                </h4>

                <span>Concluídos</span>
              </div>

              <div className="card-status">
                <h4>
                  {totalBlocos -
                    concluidos.length}
                </h4>

                <span>Restantes</span>
              </div>

              <div className="card-status destaque">
                <h4>
                  {Math.round(progresso)}%
                </h4>

                <span>Progresso</span>
              </div>
            </div>
          </div>
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