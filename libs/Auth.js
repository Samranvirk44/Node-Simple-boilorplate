const httpStatus = require('http-status-codes');
const { hashing, JWT } = require('../utils/index');
const models = require('../models/index');
const email = require('../services/email');
const constant = require('../constants');
require('dotenv').config();

module.exports = {
  registerUser: async (req) => {
    let transaction;
    try {
      transaction = await models.sequelize.transaction();
      const { body } = req;
      const errors = { flag: false };
      const userData = await models.User.byEmail(req.body.email)
      if (userData) {
        errors.flag = true;
        errors.email = constant.strings.response.error.email_exist;
      }
      if (!body.email) {
        errors.flag = true;
        errors.email = constant.strings.response.error.email_required;
      }
      if (!body.password) {
        errors.flag = true;
        errors.password = constant.strings.response.error.email_required;
      }
      body.password = await hashing.encrypt(body.password)
      if (errors.flag) {
        if (transaction) await transaction.rollback();
        return { status: false, code: httpStatus.BAD_REQUEST, error: errors };
      }
      let user = await models.User.create(body, { transaction })
      const token = await JWT.generateToken(user);
      await transaction.commit();
      return {
        status: true,
        code: httpStatus.OK,
        message: constant.strings.response.success.signup,
        token
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
  },
  
  otp: async (req) => {
    try {
      let { body } = req
      let code = Math.floor(Math.random() * 899999 + 100000);
      let mailData = {
        code: code.toString(),
        email: body.email
      }
      const result = await email.sendemail(mailData)
      return {
        status: true,
        code: httpStatus.OK,
        message: constant.strings.response.success.otp,
        result,
        otp: code
      };
    }
    catch (err) {
      return {
        status: false,
        code: httpStatus.BAD_REQUEST,
        message: err.message,
        error: err
      };
    }
  },
  loginUser: async (req) => {
    let transaction
    try {
      transaction = await models.sequelize.transaction();
      const { body } = req;
      if (!body.password || !body.email) {
        if (transaction) await transaction.rollback();
        return {
          status: false,
          code: httpStatus.BAD_REQUEST,
          message: constant.strings.response.error.required_field_missing
        };
      }
      let user = await models.User.byEmail(body.email);
      if (!user) {
        if (transaction) await transaction.rollback();
        return {
          status: false,
          code: httpStatus.BAD_REQUEST,
          message: constant.strings.response.error.invalid_email
        };
      }

      const passwordCheck = await hashing.decrypt(body.password, user.password);

      if (!passwordCheck) {
        if (transaction) await transaction.rollback();
        return {
          status: false,
          code: httpStatus.BAD_REQUEST,
          message: constant.strings.response.error.invalid_password
        };
      }

      user = user.toJSON();
      delete user.password;

      const token = await JWT.generateToken(user);
      await transaction.commit();
      return {
        status: true,
        code: httpStatus.OK,
        message: constant.strings.response.success.login,
        token
      };

    } catch (err) {
      if (transaction) await transaction.rollback();
      return {
        status: false,
        code: httpStatus.BAD_REQUEST,
        message: err.message,
        error: err.message
      };
    }
  }


};
