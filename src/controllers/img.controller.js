const catchAsync = require('../utils/catchAsync');
const { imgService } = require('../services');

const saveImageAndResize = catchAsync(async (req, res) => {
  const { url } = req.body;
  const filepathOriginal = './public/lena.jpg';
  const optimized = './public/optimize.jpg';
  const img = await imgService.downloadImageAndResize(
    url,
    filepathOriginal,
    optimized,
  );
  return res.json({ url: img });
});

module.exports = {
  saveImageAndResize,
};
