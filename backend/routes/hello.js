const express = require('express');

names = {1: 'John', 2: 'Jane', 3: 'Jack'};

helloRouter = express.Router();

// Get all names
helloRouter.get('/', (req, res) => {
    res.json(names);
    console.log(names)
});

// Get a single name
helloRouter.get('/:id', (req, res) => {
    res.json(names[req.params.id]);
    console.log(names[req.params.id])
});

// Update a single name
helloRouter.put('/:id', (req, res, next) => {
    names[req.params.id] = req.body.name;
    res.json(names[req.params.id]);
    console.log(names);
});

// Add a new name
helloRouter.post('/', (req, res) => {
    names[req.body.id] = req.body.name;
    res.json(names[req.body.id]);
    console.log(names);
});

// Delete a name
helloRouter.delete('/:id', (req, res) => {
    delete names[req.params.id];
    res.json(names);
    console.log(names);
});

module.exports = helloRouter;