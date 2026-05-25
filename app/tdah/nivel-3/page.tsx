"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "./nivel3Tdah.scss";

import {
  IoArrowBackOutline,
  IoMoonOutline,
  IoSunnyOutline,
  IoVolumeHighOutline,
  IoChevronForwardOutline,
  IoChevronBackOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";

import { RiFocus3Line } from "react-icons/ri";
import { LuChartColumn, LuBookOpen } from "react-icons/lu";

export default function TDAHNivel3() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);

  const [fontSize, setFontSize] = useState(16);

  // foco inicia ativo
  const [focusMode, setFocusMode] = useState(true);

  // bloco atual
  const [blocoAtual, setBlocoAtual] = useState(0);

  // blocos concluídos
  const [concluidos, setConcluidos] = useState<number[]>([]);

  const blocos = [
    {
      titulo: "O que é adição?",
      texto:
        "A adição é usada para juntar quantidades. Quando somamos objetos, estamos fazendo uma adição.",
    },

    {
      titulo: "Somando quantidades",
      texto:
        "Se temos 2 maçãs e ganhamos mais 1 maçã, teremos 3 maçãs ao todo. Somar significa aumentar a quantidade.",
    },

    {
      titulo: "Exemplo prático",
      texto:
        "Uma criança possui 4 lápis. Depois ganha mais 2 lápis. Agora ela possui 6 lápis.",
    },

    {
      titulo: "Resolvendo passo a passo",
      texto:
        "Observe os números com calma. Primeiro identifique a quantidade inicial. Depois veja quanto foi acrescentado.",
    },

    {
      titulo: "Atividade",
      texto:
        "João possui 3 bolas e ganhou mais 2. Quantas bolas João possui agora?",
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
  }

  function proximoBloco() {
    if (blocoAtual < totalBlocos - 1) {
      setBlocoAtual(blocoAtual + 1);
    }
  }

  function voltarBloco() {
    if (blocoAtual > 0) {
      setBlocoAtual(blocoAtual - 1);
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
              TDAH · Nível 3
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

            <div className="passo">
              Passo {blocoAtual + 1} de {totalBlocos}
            </div>
          </div>

          {/* BLOCO ÚNICO */}
          <div className="bloco ativo tdah-borda">
            <div className="cabecalho-bloco">

              <div className="circulo">
                {concluidos.includes(blocoAtual) && (
                  <IoCheckmarkCircle className="icone-check" />
                )}
              </div>

              <h3>
                {blocoAtual + 1}/5{" "}
                {blocos[blocoAtual].titulo}
              </h3>
            </div>

            <p>{blocos[blocoAtual].texto}</p>

            {!concluidos.includes(blocoAtual) && (
              <button
                className="btn-concluir tdah-btn"
                onClick={concluirBloco}
              >
                Concluir bloco

                <IoChevronForwardOutline />
              </button>
            )}
          </div>

          {/* NAVEGAÇÃO */}
          <div className="navegacao">
            <button
              onClick={voltarBloco}
              disabled={blocoAtual === 0}
            >
              <IoChevronBackOutline />
              Anterior
            </button>

            <button
              onClick={proximoBloco}
              disabled={
                blocoAtual === totalBlocos - 1
              }
            >
              Próximo
              <IoChevronForwardOutline />
            </button>
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

          {/* FOOTER */}
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