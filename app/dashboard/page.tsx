"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "./dashboard.scss";

import {
  IoArrowBackOutline,
  IoMoonOutline,
  IoSunnyOutline,
} from "react-icons/io5";

import {
  LuUsers,
  LuBookOpen,
  LuTrendingUp,
  LuSettings,
} from "react-icons/lu";

export default function DashboardEducador() {
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

  const alunos = [
    {
      nome: "Ana Silva",
      perfil: "TEA · Nível 2",
      progresso: 75,
      tipo: "tea",
    },

    {
      nome: "Pedro Santos",
      perfil: "TDAH · Nível 1",
      progresso: 40,
      tipo: "tdah",
    },

    {
      nome: "Maria Oliveira",
      perfil: "TEA · Nível 3",
      progresso: 90,
      tipo: "tea",
    },

    {
      nome: "Lucas Costa",
      perfil: "TDAH · Nível 2",
      progresso: 60,
      tipo: "tdah",
    },
  ];

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
      <main className="dashboard">
        {/* TÍTULO */}
        <div className="header-dashboard">
          <h2>Dashboard do Educador</h2>

          <p>Acompanhe o progresso dos seus alunos</p>
        </div>

        {/* CARDS */}
        <div className="cards-dashboard">
          <div className="card-info">
            <LuUsers />

            <h3>4</h3>

            <span>Alunos</span>
          </div>

          <div className="card-info">
            <LuBookOpen />

            <h3>12</h3>

            <span>Atividades</span>
          </div>

          <div className="card-info">
            <LuTrendingUp />

            <h3>66%</h3>

            <span>Progresso médio</span>
          </div>

          <div className="card-info">
            <LuSettings />

            <h3>4</h3>

            <span>Perfis ativos</span>
          </div>
        </div>

        {/* ALUNOS */}
        <div className="secao-alunos">
          <h3>Alunos</h3>

          <div className="lista-alunos">
            {alunos.map((aluno, index) => (
              <div className="card-aluno" key={index}>
                <div className="info-aluno">
                  <div className="avatar">
                    {aluno.nome.charAt(0)}
                  </div>

                  <div>
                    <h4>{aluno.nome}</h4>

                    <span
                      className={
                        aluno.tipo === "tea"
                          ? "perfil-tea"
                          : "perfil-tdah"
                      }
                    >
                      {aluno.perfil}
                    </span>
                  </div>
                </div>

                <div className="progresso-aluno">
                  <div className="barra">
                    <div
                      className="preenchimento"
                      style={{
                        width: `${aluno.progresso}%`,
                      }}
                    ></div>
                  </div>

                  <span>{aluno.progresso}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTÃO */}
        <div className="footer-dashboard">
          <button className="btn-nova-sessao" 
          onClick={() => router.push("/selectPerfil")}>
            Iniciar nova sessão
          </button>
        </div>
      </main>
    </>
  );
}