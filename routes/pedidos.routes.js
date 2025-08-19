const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedido');

router.get('/', async(req, res) => {
    try {
        const pedido = await Pedido.findAll();
        res.status(200).json(pedido);
    } catch (error){
        res.status(500).json({ error: 'Erro ao buscar Pedidos' });
    }
});

router.post('/', async(req, res) => {
    try {
        const novoPedido = await Pedido.create(req.body);
        res.status(201).json(novoPedido);
    } catch (error){
        res.status(500).json({ error: 'Erro ao criar um pedido' });
    }
});

router.put('/:id', async(req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id);
        if(pedido){
            await pedido.update(req.body);
            res.json(pedido);
        } else {
            res.status(404).json({ error: 'Pedido não encontrado' });
        }
    } catch (error){
        res.status(500).json({ error: 'Erro ao atualizar pedido' });
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id);
        if(pedido){
            await pedido.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Pedido não encontrado' });
        }
    } catch (error){
        res.status(500).json({ error: 'Erro ao excluir um pedido' });
    }
});

module.exports = router;

