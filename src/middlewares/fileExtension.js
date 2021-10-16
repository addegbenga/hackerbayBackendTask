module.exports = function getUrlextension(url) {
  return url.split(/[#?]/)[0].split('.').pop().trim();
};
