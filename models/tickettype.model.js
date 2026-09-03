module.exports = (sequelize, DataTypes) => {
  const TicketType = sequelize.define('TicketType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ticket_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  TicketType.associate = (models) => {};

  return TicketType;
};
