const express = require('express');
const router = express.Router();
const Cidade = require('../models/cidade')

const ufsValidas = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
];

router.get('/', async(req, res) => {
    try {
        const cidade = await Cidade.findAll();
        res.json(cidade);
    } catch (error){
        res.status(500).json({ error: 'Erro ao buscar cidades' });
    }
});

router.get('/:id', async(req, res) => {
    try {
        const cidade = await Cidade.findByPk(req.params.id);
        if(cidade) {
            res.json(cidade);
        } else {
            res.status(404).json({ error: 'Cidade não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar cidade' });
    }
});

router.post('/', async(req, res) => {
    try {
        const { NomCidade, CodUF } = req.body;

        if(!CodUF || !ufsValidas.includes(CodUF.toUpperCase())){
            return res.status(400).json({ error: 'UF invalida.' });
        }
        const novaCidade = await Cidade.create({ NomCidade, CodUF: CodUF.toUpperCase() });
        res.status(201).json(novaCidade);
    } catch (error){
        res.status(500).json({ error: 'Erro ao criar cidade' });
    }
});

router.put('/:id', async(req, res) => {
    try {
        const { NomCidade, CodUF } = req.body;

        if(!CodUF || !ufsValidas.includes(CodUF.toUpperCase())){
            return res.status(400).json({ error: 'UF invalida.' });
        }

        const cidade = await Cidade.findByPk(req.params.id);
        if(cidade){
            const dadosParaAtualizar = req.body;
            if(CodUF) {
                dadosParaAtualizar.CodUF = CodUF.toUpperCase();
            }

            await cidade.update(dadosParaAtualizar);
            res.json(cidade);
        } else {
            res.status(404).json({ error: 'Cidade não encontrada' });
        }
    } catch (error){
        res.status(500).json({ error: 'Erro ao atualizar cidade' });
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const cidade = await Cidade.findByPk(req.params.id);
        if(cidade){
            await cidade.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Cidade não encontrada' });
        }
    } catch (error){
        res.status(500).json({ error: 'Erro ao excluir cidade' });
    }
}); 

module.exports = router;
