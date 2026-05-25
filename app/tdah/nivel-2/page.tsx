"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "./nivel2Tdah.scss";

import {
  IoArrowBackOutline,
  IoMoonOutline,
  IoSunnyOutline,
  IoVolumeHighOutline,
  IoCheckmarkOutline,
  IoCheckmarkCircle,
  IoChevronForwardOutline,
} from "react-icons/io5";

import { RiFocus3Line } from "react-icons/ri";
import { LuBookOpen, LuChartColumn } from "react-icons/lu";

export default function TDAHNivel2() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);

  const [fontSize, setFontSize] = useState(16);

  // foco inicia ativo
  const [focusMode, setFocusMode] = useState(true);

  // começa no bloco 0
  const [blocoAtual, setBlocoAtual] = useState(0);

  // blocos concluídos
  const [concluidos, setConcluidos] = useState<number[]>([]);

  const blocos = [
    {
      titulo: "O que é divisão?",
      texto:
        "A divisão é usada para separar quantidades em partes iguais. Ela ajuda a organizar objetos, alimentos e grupos de maneira justa. Dividir significa repartir.",
    },

    {
      titulo: "Como funciona a divisão",
      texto:
        "Quando dividimos, pegamos uma quantidade total e separamos em grupos iguais. Por exemplo: 12 ÷ 3 significa dividir 12 objetos em 3 grupos iguais.",
    },

    {
      titulo: "Exemplo prático",
      texto:
        "Imagine que 8 balas precisam ser divididas entre 2 crianças. Cada criança receberá 4 balas. Isso acontece porque 8 ÷ 2 = 4.",
    },

    {
      titulo: "Resolvendo passo a passo",
      texto:
        "Para resolver uma divisão, pense em quantos grupos iguais podem ser formados. Observe a quantidade total e tente repartir sem sobrar elementos.",
    },

    {
      titulo: "Atividade",
      texto:
        "Uma professora possui 15 lápis e quer dividir igualmente entre 3 alunos. Quantos lápis cada aluno receberá?",
    },
  ];

  const totalBlocos = blocos.length;

  const progresso =
    (concluidos.length / totalBlocos) * 100;

  function concluirBloco() {
    if (!concluidos.includes(blocoAtual)) {
      setConcluidos((prev) => [
        ...prev,
        blocoAtual,
      ]);
    }

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

    document.documentElement.style.fontSize =
      `${fontSize}px`;
  }, [darkMode, fontSize]);

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
          <button onClick={() => setFontSize(fontSize - 1)}>
            −
          </button>

          <span>{fontSize}</span>

          <button onClick={() => setFontSize(fontSize + 1)}>
            +
          </button>

          <button
            className="btn-tema"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode
              ? <IoSunnyOutline />
              : <IoMoonOutline />}
          </button>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="container-aula">
        <div className="conteudo-aula">

          {/* TOPO */}
          <div className="topo-conteudo">
            <span className="tag tdah">
              TDAH · Nível 2
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
                {concluidos.length}/{totalBlocos} blocos
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

              const ativo =
                index === blocoAtual;

              const concluido =
                concluidos.includes(index);

              return (
                <div
                  key={index}
                  className={`
                    bloco
                    ${ativo ? "ativo tdah-borda" : ""}
                    ${focusMode && !ativo
                      ? "desfocado"
                      : ""
                    }
                  `}
                >
                  <div className="cabecalho-bloco">

                    <div className="circulo">
                      {concluido && (
                        <IoCheckmarkCircle className="icone-check" />
                      )}
                    </div>

                    <h3>
                      {index + 1}/5 {bloco.titulo}
                    </h3>
                  </div>

                  {/* apenas bloco ativo mostra conteúdo */}
                  {ativo && (
                    <>
                      <p>{bloco.texto}</p>

                      <button
                        className="btn-concluir tdah-btn"
                        onClick={concluirBloco}
                      >
                        Concluir bloco

                        <IoChevronForwardOutline />
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* PAINEL */}
          <div className="painel-desempenho">
            <div className="titulo-desempenho">
              <LuChartColumn />

              <h3>Seu desempenho</h3>
            </div>

            <div className="cards-desempenho">

              <div className="card-status">
                <h4>{concluidos.length}</h4>

                <span>Concluídos</span>
              </div>

              <div className="card-status">
                <h4>
                  {totalBlocos - concluidos.length}
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
              onClick={() =>
                router.push("/dashboard")
              }
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