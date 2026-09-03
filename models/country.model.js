module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    country_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Country.associate = (models) => {};

  return Country;
};
