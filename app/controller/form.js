require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

// IMPORTAR ESSAS BIBLIOTECAS ANTES
// npm install express cors body-parser sequelize mysql2
// npm install bcrypt jsonwebtoken validator express-rate-limit helmet

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const loginLimiter = rateLimit({

  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5,
  message: {
    success: false,
    message: "Muitas tentativas. Tente novamente mais tarde."
  }
});

function sanitizeUser(email, password){
  return { 
    email: validator.normalizeEmail(email || ""),
    password: String(password || "").trim()
  };
}

const sequelize = new Sequelize(
  "incluaeducadb",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql"
  }
);

sequelize.authenticate()
  .then(() => console.log("Banco conectado com sucesso"))
  .catch(err => console.error("Erro conexão com banco:", err));

const Alunos = sequelize.define("alunos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, {
  tableName: "alunos", 
  timestamps: false
});

// Rota de Cadastro
app.post("/register", async (req, res) => {

  try{

    let {email, password} = sanitizeUser(
      req.body.email,
      req.body.password
    );

    if(!validator.isEmail(email)){

      return res.status(400).json({
        success: false,
        message: "E-mail inválido"
      });
    }

    if(password.length < 8){
      
      return res.status(400).json({
        success: false,
        message: "A senha deve conter pelo menos 8 caracteres"
      });
    }

    const usuarioExiste = await Alunos.findOne({
      where: {email}
    });

    if(usuarioExiste){
      return res.status(409).json({
        success: false,
        message: "E-mail já cadastrado"
      });
    }

    const senhaHash = await bcrypt.hash(
      password, 
      10
    );

    const novoUsuario = await Alunos.create({
      email,
      password: senhaHash
    });

    return res.status(201).json({
      success: true,
      id: novoUsuario.id
    });
  } catch(error){

    console.error(error);

    return res.status(500).json({
      success: false
    });
  }
});

// Rota de Login
app.post("/login", loginLimiter, async (req, res) => {

  try{

    let{email, password} = sanitizeUser(
      req.body.email,
      req.body.password
    );

    const usuario = await Alunos.findOne({
      where: {email}
    });

    if(!usuario){

      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas"
      });
    }

    const senhaCorreta = await bcrypt.compare(
      password,
      usuario.password
    );

    if(!senhaCorreta){

      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas"
      });
    }

    const token = jwt.sign({
      id: usuario.id,
      email: usuario.email
    },
    process.env.JWT_SECRET,{
      expiresIn: "8h"
    }
  );

  return res.json({
    success: true,
    token,
    user: {
      id: usuario.id,
      email: usuario.email
    }
  });

  } catch(error) {

    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor"
    });
  }
});

// app.post("/login", async (req, res) => {
  
//   try {
//     const { email, password } = req.body;

//     const response = await Alunos.findOne({
//       where: { email, password }
//     });


//     console.log("Resultado: ", response);

//     if (!response) {
//       return res.json({ success: false });
//     }

//     return res.json({
//       success: true,
//       user: {
//         id: response.id,
//         email: response.email
//       }
//     });

//   } catch (error) {
//     console.error("Erro no login:", error);
//     return res.status(500).json({ success: false });
//   }
// });

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});

async function cadastrar() {

  try {

    const response = await fetch(
      "http://localhost:3001/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const json = await response.json();

    if (json.success) {

      setEmail("");
      setPassword("");

      setSuccess(
        "Cadastro realizado com sucesso!"
      );

      setError("");

    } else {

      setSuccess("");

      setError(
        json.message || "Erro ao cadastrar"
      );
    }

  } catch {

    setSuccess("");

    setError(
      "Erro ao conectar com servidor"
    );
  }
}