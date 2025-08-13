const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Item = sequelize.define('Item', {
    CodPedido: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    CodItem: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    CodProduto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    NumQuantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ValTotal: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    tableName: 'Itens',
    timestamps: false
});

module.exports = Item;