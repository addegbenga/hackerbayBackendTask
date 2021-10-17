const jsonPatch = require('fast-json-patch');

/**
 * patch a json request
 * @param {object} jsonBody
 * @param {object} patchBody
 * @returns {Promise<User>}
 */
const patchRequest = async (jsonBody, patchBody) => {
  const document = jsonPatch.applyOperation(jsonBody, patchBody).newDocument;
  return document;
};

module.exports = {
  patchRequest,
};
