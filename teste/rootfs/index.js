const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const options = require('data/options.json')

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
    return res.json({ error: false, login: options.login, password: options.password });
});

app.listen(port, async () => {
    console.log('Server online in port: ' + port);

    // const filePath = path.join(__dirname, 'data', 'options.json'); // Caminho para options.json

    // fs.readFile(filePath, 'utf8', (err, data) => {
    //     if (err) {
    //         console.error('Erro ao ler o arquivo:', err);
    //         return;
    //     }

    //     try {
    //         const jsonData = JSON.parse(data);
    //         console.log('Conteúdo do arquivo options.json:', jsonData);
    //     } catch (jsonError) {
    //         console.error('Erro ao analisar JSON:', jsonError);
    //     }
    // });

});