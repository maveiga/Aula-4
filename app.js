/*const express = require ("express");
const os = require("os");
const app =express();


app.get("/liveness", (request, response)=>{
    return response
    .status(200)
    .json({
        message:"meu app tá vivo",
        path:process.cwd(),
        //gid: process.getegid(),
        //uid:process.geteuid()
        });
})

app.get("/readiness", (request, response)=>{
    return response
    .status(200)
    .json({
        message:"app tá pronto",
        //platform:os.platform(),
        //freement:os.freement(),
        homedir:os.homedir
        });
})

module.exports =app;
*/

const express = require('express');
const os = require('os');
const mysql = require('mysql2/promise');

const app = express();

// Rota de verificação de integridade
app.get('/liveness', (req, res) => {
  return res.status(200).json({
    message: 'Meu app está vivo',
    path: process.cwd(),
  });
});

// Rota de prontidão
app.get('/readiness', (req, res) => {
  return res.status(200).json({
    message: 'App está pronto',
    homedir: os.homedir(),
  });
});

// Rota para obter a lista de clientes do banco de dados
app.get('/consulta-dados', async (req, res) => {
  try {
    const conexao = await conectar();

    const [rows] = await conexao.query('SELECT * FROM user');

    const clientes = rows.map((row) => ({
      id: row.id,
      nome: row.nome,
      email: row.email,
    }));

    return res.status(200).json(clientes);
  } catch (error) {
    console.error('Erro ao obter a lista de clientes:', error);
    return res.status(500).json({ error: 'Erro ao obter a lista de clientes' });
  } finally {
    global.conexao.end(); // Fecha a conexão com o banco de dados
  }
});

async function conectar() {
  if (global.conexao && global.conexao.status !== 'disconnected') {
    return global.conexao;
  }

  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'youtube',
  });

  global.conexao = conn;
  return conn;
}

module.exports = app;
