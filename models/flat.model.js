module.exports = (sequelize, DataTypes) => {
  const Flat = sequelize.define('Flat', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    etaj: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Flat.associate = (models) => {};

  return Flat;
};
