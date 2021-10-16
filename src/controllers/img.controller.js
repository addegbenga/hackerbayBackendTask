const catchAsync = require('../utils/catchAsync');
const { imgService } = require('../services');

const saveImageAndResize = catchAsync(async (req, res) => {
  const { url, originalname, optimizedname } = req.body;
  const format = 'jpg';
  const filepathOriginal = `public/${originalname}.${format}`;
  const optimized = `public/${optimizedname}.${format}`;
  const img = await imgService.downloadImageAndResize(
    url,
    filepathOriginal,
    optimized,
  );
  return res.json({ url: img, path: optimized });
});

module.exports = {
  saveImageAndResize,
};
