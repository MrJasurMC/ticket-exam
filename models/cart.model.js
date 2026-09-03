module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    finishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    updatedAt: false,
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.Customer, {
      foreignKey: "customer_id",
      as: "customer",
    });
    Cart.belongsTo(models.TicketStatus, {
      foreignKey: "status_id",
      as: "status",
    });
    Cart.hasMany(models.CartItem, {
      foreignKey: "cart_id",
      as: "items",
    });
    Cart.hasOne(models.Booking, {
      foreignKey: "cart_id",
      as: "booking",
    });
  };

  return Cart;
};
