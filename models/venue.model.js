module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define('Venue', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    site: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    schema: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    district_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Venue.associate = (models) => {
    Venue.belongsTo(models.Region, {
      foreignKey: "region_id",
      as: "region",
    });
    Venue.belongsTo(models.District, {
      foreignKey: "district_id",
      as: "district",
    });
    Venue.hasMany(models.VenuePhoto, {
      foreignKey: "venueId",
      as: "photos",
    });
    Venue.hasMany(models.VenueTypes, {
      foreignKey: "venueId",
      as: "venueTypes",
    });
    Venue.hasMany(models.Seat, {
      foreignKey: "venue_id",
      as: "seats",
    });
    Venue.hasMany(models.Event, {
      foreignKey: "venue_id",
      as: "events",
    });
  };

  return Venue;
};
