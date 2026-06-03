const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();

app.use(cors());
app.use(bodyParser.json());

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




app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await Alunos.findOne({
      where: { email, password }
    });

    if (!response) {
      return res.json({ success: false });
    }

    return res.json({
      success: true,
      user: {
        id: response.id,
        email: response.email
      }
    });

  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ success: false });
  }
});

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});