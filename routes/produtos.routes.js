const express = require('express');
const router = express.Router();
const Produto = require('../models/produto');

router.get('/', async(req, res) => {
    try {
        const produto = await Produto.findAll();
        res.json(produto);
    } catch (error){
        res.status(500).json({ error: 'Erro ao buscar por produtos' });
    }
});

router.get('/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);

    if (produto) {
      res.json(produto);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

router.post('/', async(req, res) => {
    try {
        const novoProduto = await Produto.create(req.body);
        res.status(201).json(novoProduto);
    } catch (error){
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
});

router.put('/:id', async(req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if(produto){
            await produto.update(req.body);
            res.json(produto);
        } else {
            res.status(400).json({ error: 'Produto não encontrado' });
        }
    } catch (error){
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
});

router.delete('/:id', async(req,res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if(produto){
            await produto.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error){
        res.status(500).json({ error: 'Erro ao excluir Produto' });
    }
});

module.exports = router;
