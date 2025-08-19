const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');

router.get('/', async(req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (erro){
        res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
});

router.post('/', async(req, res) => {
    try {
        const novoCliente = await Cliente.create(req.body);
        res.status(201).json(novoCliente);
    } catch (error){
        res.status(500).json({ error: 'Erro ao criar cliente' });
    }
});

router.put('/:id', async(req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if(cliente){
            await cliente.update(req.body);
            res.json(cliente);
        } else {
            res.status(404).json({ error: 'Cliente não encontrado' });
        }
    } catch (error){
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if(cliente){
            await cliente.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Cliente não encontrado' });
        }
    } catch (error){
        res.status(500).json({ error: 'Erro ao excluir cliente' });
    }
});

module.exports = router;
