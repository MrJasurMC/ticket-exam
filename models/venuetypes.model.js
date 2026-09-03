module.exports = (sequelize, DataTypes) => {
  const VenueTypes = sequelize.define('VenueTypes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    venue_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'venueId',
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'typeId',
    },
  });

  VenueTypes.associate = (models) => {
    VenueTypes.belongsTo(models.Venue, {
      foreignKey: "venue_id",
      as: "venue",
    });
    VenueTypes.belongsTo(models.Types, {
      foreignKey: "type_id",
      as: "type",
    });
  };

  return VenueTypes;
};
