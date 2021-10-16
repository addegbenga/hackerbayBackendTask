const express = require('express');
const imgController = require('../../controllers/img.controller');
const { auth } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { authValidation } = require('../../validations.js');

const router = express.Router();

router.post(
  '/resize',
  auth,
  validate(authValidation.imageFields),
  imgController.saveImageAndResize,
);

module.exports = router;
