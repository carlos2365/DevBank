const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("contact", {
    alias: {
      type: DataTypes.TEXT,
    },
    contactId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.INTEGER,
    },
    cvu_pesos: {
      type: DataTypes.BIGINT,
    },

    cvu_dolares: {
      type: DataTypes.BIGINT,
    },
  });
};
