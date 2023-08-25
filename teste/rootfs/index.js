const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());

// Definindo uma rota raiz
app.get('/', (req, res) => {
    return res.send('Bem-vindo ao meu servidor Express!');
});

app.get('/dados', (req, res) => {

    const filePath = path.join(__dirname, 'data', 'options.json');

    if (!fs.existsSync(filePath)) return res.json({ error: true, msg: "Arquivo options.json não existe." });

    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const { login, password } = jsonData;

    if (login == "" || password == "") return res.json({ error: true, msg: "Preencha os campos login/password no addon." });

    return res.json({ error: false, login: options.login, password: options.password });
});

app.listen(port, async () => {
    console.log('Server online in port: ' + port);
});