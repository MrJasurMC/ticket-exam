module.exports = (sequelize, DataTypes) => {
  const EventType = sequelize.define('EventType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_event_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  EventType.associate = (models) => {
    EventType.belongsTo(models.EventType, {
      foreignKey: "parent_event_type_id",
      as: "parent",
    });
    EventType.hasMany(models.EventType, {
      foreignKey: "parent_event_type_id",
      as: "children",
    });
  };

  return EventType;
};
