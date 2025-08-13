const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Pedido = sequelize.define('Pedido', {
    CodPedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    CodCliente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    DatPedido: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ValPedido: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    Observacao: {
        type: DataTypes.STRING(60)
    }
}, {
    tableName: 'Pedidos',
    timestamps: false
});

module.exports = Pedido;