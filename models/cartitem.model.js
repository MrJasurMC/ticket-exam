module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ticket_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Ticket, {
      foreignKey: "ticket_id",
      as: "ticket",
    });
    CartItem.belongsTo(models.Cart, {
      foreignKey: "cart_id",
      as: "cart",
    });
  };

  return CartItem;
};
