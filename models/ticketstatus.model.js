module.exports = (sequelize, DataTypes) => {
  const TicketStatus = sequelize.define('TicketStatus', {
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

  return TicketStatus;
};
