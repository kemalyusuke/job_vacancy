'use strict';
const { finished } = require('nodemailer/lib/xoauth2');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.User, {foreignKey: 'UserId'} )
      Job.belongsToMany(models.User, {
        through: 'Applies',
        foreignKey: 'JobId'
      })
    }
  };
  Job.init({
    name: DataTypes.STRING,
    skill: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};