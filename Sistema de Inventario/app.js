const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('¡Bienvenido al Sistema de Inventario!');
});

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`El servidor está escuchando en http://localhost:${port}`);
});
