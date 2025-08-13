const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Produto = sequelize.define('Produto', {
    CodProduto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NomProduto: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    ValProduto: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }    
}, {
    tableName: 'Produtos',
    timestamps: false
});

module.exports = Produto;