const express = require('express');
const imgController = require('../../controllers/img.controller');
const { auth } = require('../../middlewares/auth');

const router = express.Router();

router.post('/resize', auth, imgController.saveImageAndResize);

module.exports = router;
