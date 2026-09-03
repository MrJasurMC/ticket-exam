module.exports = (sequelize, DataTypes) => {
  const Sector = sequelize.define('Sector', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sector_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Sector;
};
