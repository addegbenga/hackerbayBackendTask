const httpStatus = require('http-status');
const patchService = require('../services/patch.service');
const catchAsync = require('../utils/catchAsync');

const getPatchRequest = catchAsync(async (req, res) => {
  const { jsonObject, jsonPatchObject } = req.body;
  const response = await patchService.patchRequest(jsonObject, jsonPatchObject);
  res.status(httpStatus.CREATED).send(response);
});

module.exports = { getPatchRequest };
