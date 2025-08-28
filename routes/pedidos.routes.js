const express = require('express');
const router = express.Router();
const sequelize = require('../database');
const Pedido = require('../models/pedido');
const Item = require('../models/item');
const Cliente = require('../models/cliente');
const Cidade = require('../models/cidade');
const Produto = require('../models/produto');

router.get('/', async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: [
                {
                    model: Cliente,
                    include: [Cidade] 
                },
                {
                    model: Item,
                    include: [Produto] 
                }
            ],
            order: [['CodPedido', 'ASC']] 
        });
        res.json(pedidos);
    } catch (error) {
        console.error("Erro ao buscar Pedidos", error);
        res.status(500).json({ error: 'Erro ao buscar Pedidos' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id, {
            include: [ 
                {
                    model: Cliente,
                    include: [Cidade]
                },
                {
                    model: Item,
                    include: [Produto]
                }
            ]
        });
        if (pedido) {
            res.json(pedido);
        } else {
            res.status(404).json({ error: 'Pedido não encontrado' });
        }
    } catch (error) {
        console.error("Erro ao buscar Pedido", error);
        res.status(500).json({ error: 'Erro ao buscar Pedido' });
    }
});

router.post('/', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { Itens, ...dadosPedido } = req.body;

    const novoPedido = await Pedido.create(dadosPedido, { transaction: t });

    if (Itens && Itens.length > 0) {
      const itensParaCriar = Itens.map(item => ({
        ...item,
        CodPedido: novoPedido.CodPedido 
      }));
      await Item.bulkCreate(itensParaCriar, { transaction: t });
    }

    await t.commit();

    const pedidoCompleto = await Pedido.findByPk(novoPedido.CodPedido, {
      include: [{ model: Item, include: [Produto] }, { model: Cliente, include: [Cidade] }]
    });

    res.status(201).json(pedidoCompleto);

  } catch (error) {
    await t.rollback();
    console.error("ERRO DETALHADO AO CRIAR PEDIDO:", error);
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ error: 'Erro ao criar o pedido e seus itens' });
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

