var colorLib = require('../color.js'),
    crypto = require('crypto');
function md5 (str) {
  return crypto.createHash('md5').update(str).digest('hex');
}
module.exports = function colorFlopChangeOption (name, color, flop) {
  var materialPath = this.config.materials + '/' + name + '.png',
      color = colorLib.normalizeColor(color),
      outLineColor = colorLib.antiMonoColor(color),
      flop = (flop ? '-flop' : ' '),
      hash = md5('mono_' + name + color + flop),
      url = this.config.urlDirName + '/' + hash + '.png',
      filePath = this.config.targetDir + '/' + hash + '.png';
  return {
    args : [
      materialPath,
      '-format', 'png',
      '-alpha', 'extract',
      '-background', color,
      '-alpha', 'shape',
      '(', materialPath,
      '-background', '#FFFFFF',
      '-flatten',
      '-negate',
      '-type', 'Grayscale',
      '-background', outLineColor,
      '-alpha', 'shape' ,')',
      flop,
      '-composite',
      filePath
    ].filter(function flt (elm) {
      return elm !== ' ';
    }),
    hash : hash,
    name : 'colorFlopChange',
    file : filePath,
    send : url
  };
}