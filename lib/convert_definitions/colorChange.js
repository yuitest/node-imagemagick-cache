var colorLib = require('../color.js'),
    crypto = require('crypto');
function md5 (str) {
  return crypto.createHash('md5').update(str).digest('hex');
}
module.exports = function colorChangeOption (name, color) {
  var materialPath = this.config.materials + '/' + name + '.png';
      ncolor = colorLib.normalizeColor(color),
      hash = md5('colorOnly_' + name + '_' + ncolor),
      url = this.config.urlDirName + '/' + hash + '.png',
      filePath = this.config.targetDir + '/' + hash + '.png';
  return {
    args : [
      materialPath,
      '-format', 'png',
      '-fill', ncolor,
      '-opaque', '#FFFFFF',
      filePath
    ],
    hash : hash,
    name : 'colorChange',
    file : filePath,
    send : url
  };
}