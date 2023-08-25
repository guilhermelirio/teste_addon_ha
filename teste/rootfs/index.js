let error = false

const FALSY_VALUES = ['false', 'no', '0', 'null', 'undefined']
const convert = {
    'json': v => JSON.parse(v),
    'string': v => v || "",
    'number': v => v || "",
    'bool': v => v && !FALSY_VALUES.includes(v.toLowerCase().trim()) || false
}

const constants = [
    { name: 'login', type: 'string', required: true, value: "" },
    { name: 'password', type: 'string', required: true, value: "" },

].reduce((acc, { name, type, value, required }) => {
    let val = convert[type](process.env[name] || value || '')

    if (required && (val === null || val === undefined || val === '')) {
        error = true
        console.log(name, 'Required')
    }

    return {
        ...acc,
        [name]: value
    }
}, {})

try {
    // Seu código que pode lançar uma exceção
    if (error) {
        throw new Error('Some fields are required');
    }
} catch (error) {
    console.error('Erro:', error.message);
    return; // Isso interrompe o fluxo do programa
    // Ou você pode usar process.exit() para encerrar completamente o processo
    // process.exit(1); // Isso encerrará o processo com status de erro
}

const express = require('express');
const app = express();
const port = 3000;

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
    return res.json({ error: false, login: constants.login, password: constants.password });
});

app.listen(port, async () => {
    console.log('Server online in port: ' + port);
});