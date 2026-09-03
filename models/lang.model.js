module.exports = (sequelize, DataTypes) => {
  const Lang = sequelize.define('Lang', {
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

  return Lang;
};
