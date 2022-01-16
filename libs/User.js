const httpStatus = require('http-status-codes');
const models = require('../models/index');

const constant = require('../constants');
require('dotenv').config();

module.exports = {
  getAll: async (req) => {
    let transaction;
    try {
      transaction = await models.sequelize.transaction();
      let result= await models.User.getAll(req)
      await transaction.commit();
      return {
        status: true,
        code: httpStatus.OK,
        message: constant.strings.response.success.get,
        result
      };
    } catch (err) {
      if (transaction) await transaction.rollback();
      return {
        status: false,
        code: httpStatus.BAD_REQUEST,
        message: err.message,
        error: err
      };
    }
  }

};
