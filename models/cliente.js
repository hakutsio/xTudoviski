console.log("--- EXECUTANDO O ARQUIVO cliente.js ATUALIZADO ---");

const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Cliente = sequelize.define('Cliente', {
    CodCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NomCliente: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    CodEndereco: {
        type: DataTypes.STRING(50)
    },
    Observacao: {
        type: DataTypes.STRING(60),
    }
}, {
    tableName: 'Clientes',
    timestamps: false
});

module.exports = Cliente;