module.exports = (sequelize, DataTypes) => {
  const Types = sequelize.define('Types', {
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

  return Types;
};
