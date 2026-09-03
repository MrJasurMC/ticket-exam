module.exports = (sequelize, DataTypes) => {
  const District = sequelize.define('District', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  District.associate = (models) => {
    District.belongsTo(models.Region, {
      foreignKey: "region_id",
      as: "region",
    });
  };

  return District;
};
