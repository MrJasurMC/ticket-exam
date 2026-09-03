module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    service_fee: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ticket_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Ticket.associate = (models) => {
    Ticket.belongsTo(models.Event, {
      foreignKey: "event_id",
      as: "event",
    });
    Ticket.belongsTo(models.Seat, {
      foreignKey: "seat_id",
      as: "seat",
    });
    Ticket.belongsTo(models.TicketStatus, {
      foreignKey: "status_id",
      as: "status",
    });
    Ticket.belongsTo(models.TicketType, {
      foreignKey: "ticket_type_id",
      as: "ticketType",
    });
    Ticket.hasMany(models.CartItem, {
      foreignKey: "ticket_id",
      as: "cartItems",
    });
  };

  return Ticket;
};
