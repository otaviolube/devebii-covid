const express = require('express');
const main = express.Router();
const cors = require('cors');

main.use(cors());

main.get("/", (req, res) => {
    res.send('Você acessou a rota padrão da aplicação!');
});

main.post("/", (req, res) => {
    res.send("Você acessou a rota padrão com POST");
});

main.delete("/", (req, res) => {
    res.send("Você acessou a rota padrão com DELETE");
})


module.exports = main;