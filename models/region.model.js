module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define('Region', {
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

  Region.associate = (models) => {
    Region.hasMany(models.District, {
      foreignKey: "region_id",
      as: "districts",
    });
  };

  return Region;
};
