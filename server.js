const express = require('express');
const cors = require('cors');
const sequelize = require('./database');

const Cidade = require('./models/cidade');
const Cliente = require('./models/cliente');
const Produto = require('./models/produto');
const Pedido = require('./models/pedido');
const Item = require('./models/item');

Cliente.belongsTo(Cidade, { foreignKey: 'CodCidade' });
Cidade.hasMany(Cliente, { foreignKey: 'CodCidade' });

Pedido.belongsTo(Cliente, { foreignKey: 'CodCliente' });
Cliente.hasMany(Pedido, { foreignKey: 'CodCliente' });

Item.belongsTo(Pedido, { foreignKey: 'CodPedido' });
Pedido.hasMany(Item, { foreignKey: 'CodPedido'});

Item.belongsTo(Produto, { foreignKey: 'CodProduto'});
Produto.hasMany(Item, { foreignKey: 'CodProduto'});

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/cidades', async (req, res) => {
    //...
});

sequelize.sync({ force: false }).then(() => {
    app.listen(port, () =>{
        console.log(`Servidor rodando na porta ${port}`);
        console.log(`Banco de dados sincronizando e todas as tabelas foram criadas!`);
    });
});

