const express = require('express');
const router = express.Router();
const Item = require('../models/item');

router.get('/', async(req, res) => {
    try {
        const item = await Item.findAll();
        res.status(200).json(item);
    } catch (error){
        res.status(500).json({ error: 'Erro ao buscar itens' });
    }
});

router.post('/', async(req, res) => {
    try {
        const novoItem = await Item.create(req.body);
        res.status(201).json(novoItem);
    } catch (error){
        res.status(500).json({ error: 'Erro ao criar um item' });
    }
});

router.put('/:codPedido/:codItem', async(req, res) => {
    try {
        const item = await Item.findOne({
            where: {
                CodPedido: req.params.codPedido,
                CodItem: req.params.codItem
            }
        });

        if(item){
            await item.update(req.body);
            res.json(item);
        } else {
            res.status(404).json({ error: 'Item não encontrado' });
        }
    } catch (error){
        res.status(500).json({ error: 'Erro ao atualizar Item'});
    }
});

router.delete('/:codPedido/:codItem', async(req, res) => {
    try{
        const item = await Item.findOne({
            where: {
                CodPedido: req.params.codPedido,
                CodItem: req.params.codItem
            }
        });
        if(item){
            await item.destroy();
            res.status(204).send();
        } else{
            res.status(404).json({ error: 'Item não encontrado' });
        }
    } catch (error){
        res.status(500).json({ error: 'Erro ao excluir o Item' });
    }
});

module.exports = router;