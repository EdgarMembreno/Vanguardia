const express = require('express');
const app = express();
const port = 3000;

let inventory = [];

app.use(express.json());

app.get('/inventory', (req, res) => {
    res.json(inventory);
});

app.get('/inventory/:id', (req, res) => {
    const id = req.params.id;
    const item = inventory.find(item => item.id === id);
    if (!item) {
        return res.status(404).json({ error: 'Elemento no encontrado' });
    }
    res.json(item);
});

app.post('/inventory', (req, res) => {
    const newItem = req.body;
    newItem.id = generateId();
    inventory.push(newItem);
    res.status(201).json(newItem);
});

app.put('/inventory/:id', (req, res) => {
    const id = req.params.id;
    const updatedItem = req.body;
    const index = inventory.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Elemento no encontrado' });
    }
    inventory[index] = Object.assign({}, inventory[index], updatedItem);
    res.json(inventory[index]);
});

app.delete('/inventory/:id', (req, res) => {
    const id = req.params.id;
    const index = inventory.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Elemento no encontrado' });
    }
    const deletedItem = inventory.splice(index, 1);
    res.json(deletedItem[0]);
});

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

app.get('/', (req, res) => {
    res.send('¡Bienvenido al Sistema de Inventario!');
});

app.listen(port, () => {
    console.log(`El servidor está escuchando en http://localhost:${port}`);
});
