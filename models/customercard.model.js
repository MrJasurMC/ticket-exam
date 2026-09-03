module.exports = (sequelize, DataTypes) => {
  const CustomerCard = sequelize.define('CustomerCard', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    month: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
  });

  CustomerCard.associate = (models) => {
    CustomerCard.belongsTo(models.Customer, {
      foreignKey: "customer_id",
      as: "customer",
    })
  }

  return CustomerCard;
}