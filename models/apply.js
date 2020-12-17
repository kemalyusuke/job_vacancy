'use strict';
const {
  Model
} = require('sequelize');
const sendMail = require('../helpers/nodemailer')
module.exports = (sequelize, DataTypes) => {
  class Apply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static generateEmail(data) {
      let text = `Hello ${data.companyFullName}, I'm ${data.senderfullname} and I would like to apply to your post, ${data.jobName} because i can handle ${data.jobSkill} and i'm interested in the salary offering (${data.jobSalary}). Please Email me at ${data.sender}. Thankyou!!`
      return sendMail(data.emailTo, `Job Vacancy - ${data.jobName}`, text)
    }
  };
  Apply.init({
    JobId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Apply',
  });
  return Apply;
};