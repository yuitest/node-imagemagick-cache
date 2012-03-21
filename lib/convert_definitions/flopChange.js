var crypto = require('crypto');
function md5 (str) {
  return crypto.createHash('md5').update(str).digest('hex');
}
module.exports = function flopChangeOption (name, flop) {
  var materialPath = this.config.materials + '/' + name + '.png',
      flop = (flop ? '-flop' : ' '),
      hash = md5('color' + name + '' + flop),
      url = this.config.urlDirName + '/' + hash + '.png',
      filePath = this.config.targetDir + '/' + hash + '.png';
  return {
    args : [materialPath, '-format', 'png', flop, filePath]
      .filter(function flt (elm) {
        return elm !== ' ';
    }),
    name : 'flopChange',
    hash : hash,
    file : filePath,
    send : url
  };
}