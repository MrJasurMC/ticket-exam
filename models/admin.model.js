const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_creator: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    hashed_refresh_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    defaultScope: {
      attributes: { exclude: ['hashed_password', 'hashed_refresh_token'] },
    },
    scopes: {
      withSensitive: { attributes: {} },
    },
  });

  Admin.beforeSave(async (admin, options) => {
    if (admin.changed('hashed_password')) {
      admin.hashed_password = await bcrypt.hash(admin.hashed_password, 10);
    }
  });

  Admin.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.hashed_password;
    delete values.hashed_refresh_token;
    return values;
  };

  return Admin;
};
