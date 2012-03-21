var biasRGB = [0.00083203125, 0.00279296875, 0.00028125000];
var colorExpression = /^#?[0-9A-Fa-f]{6}$/;
function antiMonoColor (str) {
  var rgb = [str.substr(0, 2), str.substr(2, 2), str.substr(4, 2)];
  return (biasRGB[0] * parseInt(rgb[0], 16) +
          biasRGB[1] * parseInt(rgb[1], 16) +
          biasRGB[2] * parseInt(rgb[2], 16));
}
function normalizeColor (str) {
  if (!isColor(str)) {
    return '#FFFFFF';
  } else {
    if (str[0] !== '#') {
      str = '#' + str;
    }
    return str.toUpperCase();
  }
}
function isColor (str) {
  return colorExpression.test(str);
}
module.exports = {
  isColor : isColor,
  normalizeColor : normalizeColor,
  antiMonoColor : antiMonoColor
};