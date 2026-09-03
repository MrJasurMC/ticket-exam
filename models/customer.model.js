const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    gender_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lang_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
  })

  Customer.beforeSave(async (customer, options) => {
    if (customer.changed('hashed_password')) {
      customer.hashed_password = await bcrypt.hash(customer.hashed_password, 10);
    }
  });

  
  
  
  
  Customer.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.hashed_password;
    delete values.hashed_refresh_token;
    return values;
  };

  Customer.associate = (models) => {
    Customer.belongsTo(models.Gender, {
      foreignKey: "gender_id",
      as: "gender",
    });
    Customer.belongsTo(models.Lang, {
      foreignKey: "lang_id",
      as: "lang",
    });
    Customer.hasMany(models.CustomerCard, {
      foreignKey: "customer_id",
      as: "cards",
    });
    Customer.hasMany(models.CustomerAddress, {
      foreignKey: "customer_id",
      as: "addresses",
    });
    Customer.hasMany(models.Cart, {
      foreignKey: "customer_id",
      as: "carts",
    });
  };

  return Customer;
};
