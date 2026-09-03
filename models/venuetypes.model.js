module.exports = (sequelize, DataTypes) => {
  const VenueTypes = sequelize.define('VenueTypes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  VenueTypes.associate = (models) => {
    VenueTypes.belongsTo(models.Venue, {
      foreignKey: "venueId",
      as: "venue",
    });
    VenueTypes.belongsTo(models.Types, {
      foreignKey: "typeId",
      as: "type",
    });
  };

  return VenueTypes;
};
