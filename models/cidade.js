const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Cidade = sequelize.define('Cidade', {
    CodCidade: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NomCidade: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    CodUF: {
        type: DataTypes.STRING(2),
        allowNull: false
    }
}, {
    tableName: 'Cidades',
    timestamps: false
});

module.exports = Cidade;