const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('account', {
        accountNumber: {
            type: DataTypes.BIGINT,
            unique: true,
            allowNull: false,
        },
        balance: {
            type: DataTypes.DECIMAL,
        },
        currency: {
            type: DataTypes.ENUM("PESOS","USD"),
            allowNull: false,
        },
        cvu: {
            type: DataTypes.BIGINT,
            unique: true,
            allowNull: false,
        },
         type: {
            type: DataTypes.ENUM("CAJA DE AHORRO","CUENTA CORRIENTE") ,
            allowNull: false,
        },
    })
}