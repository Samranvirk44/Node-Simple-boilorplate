const httpStatus = require('http-status-codes');
const models = require('../models/index');

const constant = require('../constants');
require('dotenv').config();

module.exports = {
  getAll: async () => {
    let transaction;
    try {
      transaction = await models.sequelize.transaction();
      let result= await models.User.findAll()
      console.log(result)
      await transaction.commit();
      return result
    } catch (err) {
      if (transaction) await transaction.rollback();
      return err
    }
  },
  getAll: async () => {
    let transaction;
    try {
      transaction = await models.sequelize.transaction();
      let result= await models.User.findAll()
      console.log(result)
      await transaction.commit();
      return result
    } catch (err) {
      if (transaction) await transaction.rollback();
      return err
    }
  },
  createUser: async (req) => {
    let transaction;
    try {
      transaction = await models.sequelize.transaction();
     // let result= await models.User.getAll(req)

   let data=  await models.User.create(req)
      await transaction.commit();
      return data
    } catch (err) {
      if (transaction) await transaction.rollback();
      return err;
    }
  }

};
