'use strict';
const {
  Model
} = require('sequelize');

const { hasing, hashing } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Job, {foreignKey:'UserId'} )
      User.belongsToMany(models.Job, {
        through: 'Applies',
        foreignKey: 'UserId'
      })
    }
    fullname(){
      return this.first_name + ' ' + this.last_name
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate(instance, options) {
        instance.password = hashing(instance.password)
      }
    },
  });
  return User;
};