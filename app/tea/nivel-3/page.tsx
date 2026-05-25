"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "./nivel3.scss";

import {
  IoArrowBackOutline,
  IoMoonOutline,
  IoSunnyOutline,
  IoVolumeHighOutline,
  IoCheckmarkCircle,
  IoChevronForwardOutline,
  IoChevronBackOutline,
} from "react-icons/io5";

import { LuBookOpen } from "react-icons/lu";
import { RiFocus3Line } from "react-icons/ri";

export default function Nivel3TEA() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);

  const [fontSize, setFontSize] = useState(15);

  const [blocoAtual, setBlocoAtual] = useState(0);

  const blocos = [
    {
      titulo: "O tempo muda durante o dia",
      texto:
        "O tempo pode mudar em diferentes momentos do dia. Às vezes faz sol. Em outros momentos pode chover ou ventar.",

      imagem: "/geografia/variacoes-clima.webp",
    },

    {
      titulo: "Dias de sol",
      texto:
        "Nos dias de sol, o céu costuma ficar claro e a temperatura pode aumentar. Muitas pessoas usam boné, protetor solar e roupas leves.",

    },

    {
      titulo: "Dias de chuva",
      texto:
        "Nos dias de chuva, nuvens escuras aparecem no céu e a água cai das nuvens. Algumas pessoas usam guarda-chuva e capa de chuva.",

    },

    {
      titulo: "Dias frios",
      texto:
        "Em dias frios, a temperatura diminui. As pessoas costumam usar casacos, cobertores e roupas mais quentes para se proteger.",

    },

    {
      titulo: "Observando o clima",
      texto:
        "Antes de sair de casa, podemos observar o céu para entender como está o tempo. Isso ajuda a escolher a roupa adequada para o dia.",

      imagem: "/geografia/observando-clima.jpeg",
    },

    {
      titulo: "Atividade",
      texto:
        "Observe a imagem apresentada. O clima mostrado é de sol, chuva ou frio?",

      imagem: "/geografia/clima.webp",
    },
  ];

  function proximoBloco() {
    if (blocoAtual < blocos.length - 1) {
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
            <span className="tag">TEA · Nível 3</span>
            <span className="tag">Geografia</span>
            <div className="acoes-aula">
              <button className="btn-foco">
                <RiFocus3Line />
                Sair do foco
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

          {/* PASSO */}
          <div className="passo">
            Passo {blocoAtual + 1} de {blocos.length}
          </div>

          {/* BLOCO */}
          <div className="bloco ativo">
            <div className="cabecalho-bloco">
              <div className="circulo">
                {blocoAtual > 0 && (
                  <IoCheckmarkCircle className="icone-check" />
                )}
              </div>

              <h3>
                {blocoAtual + 1}/6 {blocos[blocoAtual].titulo}
              </h3>
            </div>

            <p>{blocos[blocoAtual].texto}</p>

            {blocos[blocoAtual].imagem && (
              <img
                src={blocos[blocoAtual].imagem}
                alt={blocos[blocoAtual].titulo}
                className="imagem-bloco"
              />
            )}

            <button
              className="btn-concluir"
              onClick={proximoBloco}
            >
              Concluir bloco
              <IoChevronForwardOutline />
            </button>
          </div>

          {/* NAVEGAÇÃO */}
          <div className="navegacao">
            <button
              className="btn-nav"
              onClick={voltarBloco}
              disabled={blocoAtual === 0}
            >
              <IoChevronBackOutline />
              Anterior
            </button>

            <button
              className="btn-nav"
              onClick={proximoBloco}
              disabled={blocoAtual === blocos.length - 1}
            >
              Próximo
              <IoChevronForwardOutline />
            </button>
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