module.exports = (sequelize, DataTypes) => {
  const SeatType = sequelize.define('SeatType', {
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

  return SeatType;
};
