const fs = require('fs');
const got = require('got');
const httpStatus = require('http-status');
const sharp = require('sharp');
const getFileExt = require('../middlewares/fileExtension');
const ApiError = require('../utils/ApiError');

/**
 * clean up public image file if resizing fails
 * @param {string} originalImagePath
 * @param {string} resizedImagePath
 */
const handleException = (originalImagePath, resizedImagePath) => {
  try {
    fs.unlinkSync(originalImagePath);
    fs.unlinkSync(resizedImagePath);
  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'error');
  }
};
/**
 * download image from url and resize it
 * @param {string} url
 * @param {string} originalImagePath
 * @param {string} resizedImagePath
 * @param {string} format
 * @returns {Promise}
 */
const downloadImageAndResize = (url, originalImagePath, resizedImagePath) => {
  const fileExt = getFileExt(url);
  const sharpStream = sharp({
    failOnError: false,
  });

  const promises = [];

  promises.push(sharpStream.clone().toFormat(fileExt).toFile(`${originalImagePath}.${fileExt}`));

  promises.push(
    sharpStream
      .clone()
      .resize({ width: 50, height: 50 })
      .toFormat(fileExt)
      .toFile(`${resizedImagePath}.${fileExt}`),
  );

  // https://github.com/sindresorhus/got#gotstreamurl-options
  got.stream(url).pipe(sharpStream);

  const response = Promise.all(promises)
    .then((res) => res)
    .catch(() => {
      // console.error("Error processing files, let's clean it up", err);
      handleException(originalImagePath, resizedImagePath);
    });
  return response;
};

module.exports = { downloadImageAndResize };
