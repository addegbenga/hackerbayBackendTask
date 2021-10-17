const express = require('express');
const patchController = require('../../controllers/patch.controller');
const { auth } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { patchFields } = require('../../validations.js/auth.validation');

const router = express.Router();

router.patch(
  '/modify',
  auth,
  validate(patchFields),
  patchController.getPatchRequest,
);

module.exports = router;
