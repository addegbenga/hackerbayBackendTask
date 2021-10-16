const express = require('express');
const authController = require('../../controllers/auth.controller');
const { authValidation } = require('../../validations.js');
const validate = require('../../middlewares/validate');
const { auth } = require('../../middlewares/auth');

const router = express.Router();

router.post('/login', validate(authValidation.login), authController.login);
router.get('/me', auth, (req, res) => {
  res.send('ok');
});

module.exports = router;
