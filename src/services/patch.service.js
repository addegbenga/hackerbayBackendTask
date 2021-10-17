const jsonPatch = require('fast-json-patch');

/**
 * patch a json request
 */
const patchRequest = async (jsonBody, patchBody) => {
  const document = jsonPatch.applyOperation(jsonBody, patchBody).newDocument;
  return document;
};

module.exports = {
  patchRequest,
};
