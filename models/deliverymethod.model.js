module.exports = (sequelize, DataTypes) => {
  const DeliveryMethod = sequelize.define('DeliveryMethod', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  DeliveryMethod.associate = (models) => {};

  return DeliveryMethod;
};
