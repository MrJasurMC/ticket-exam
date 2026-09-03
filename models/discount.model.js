module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define('Discount', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    discount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    finish_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  Discount.associate = (models) => {};

  return Discount;
};
