const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('transfer', {
        type: {
            type: DataTypes.ENUM("TRANSFER","DEP", "EXT", "COMPRA-USD", "VENTA-USD"),
            allowNull: false,
        },
        currency: {
            type: DataTypes.ENUM("PESOS","USD"),
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        origin: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
         destination: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        value: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    })
}