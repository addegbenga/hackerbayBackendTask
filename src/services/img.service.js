const fs = require('fs');
const got = require('got');
const sharp = require('sharp');

const downloadImageAndResize = (url, originalImagePath, resizedImagePath) => {
  const sharpStream = sharp({
    failOnError: false,
  });

  const promises = [];

  promises.push(
    sharpStream.clone().jpeg({ quality: 100 }).toFile(originalImagePath),
  );

  promises.push(
    sharpStream
      .clone()
      .resize({ width: 500 })
      .jpeg({ quality: 80 })
      .toFile(resizedImagePath),
  );

  // https://github.com/sindresorhus/got#gotstreamurl-options
  got.stream(url).pipe(sharpStream);

  const response = Promise.all(promises)
    .then((res) => res)
    .catch((err) => {
      console.error("Error processing files, let's clean it up", err);
      try {
        fs.unlinkSync(originalImagePath);
        fs.unlinkSync(resizedImagePath);
      } catch (e) {
        console.log(e);
      }
    });
  return response;
};

module.exports = { downloadImageAndResize };
