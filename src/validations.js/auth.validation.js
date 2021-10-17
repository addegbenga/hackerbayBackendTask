const Joi = require('joi');

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};
const imageFields = {
  body: Joi.object().keys({
    originalname: Joi.string().required(),
    optimizedname: Joi.string().required(),
    url: Joi.string().required(),
  }),
};

const patchFields = {
  body: Joi.object().keys({
    jsonObject: Joi.object().required(),
    jsonPatchObject: Joi.object().required(),
  }),
};

module.exports = {
  login,
  imageFields,
  patchFields,
};
