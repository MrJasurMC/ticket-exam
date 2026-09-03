module.exports = (sequelize, DataTypes) => {
  const VenuePhoto = sequelize.define('VenuePhoto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  VenuePhoto.associate = (models) => {
    VenuePhoto.belongsTo(models.Venue, {
      foreignKey: "venueId",
      as: "venue",
    });
  };

  return VenuePhoto;
};
