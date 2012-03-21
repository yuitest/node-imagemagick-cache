var fs = require('fs');
function deleter (options) {
  var marginTime = options.margin || 60 * 1000,
      targetDir = options.targetDir,
      maxFiles = options.maxFiles || 1024;
  setInterval(function interval (evt) {
    var file, i, c, dir, infos = [], dels = [];
    dir = fs.readdirSync(targetDir);
    for (i = 0, c = dir.length; i < c; i += 1) {
      file = fs.statSync(targetDir + '/' + dir[i]);
      file.name = dir[i];
      file.path = targetDir + '/' + dir[i];
      file.gtime = file.atime.getTime();
      infos.push(file);
    }
    infos.sort(function sorter (a, b) {
      return a.gtime - b.gtime;
    });
    while (infos.length > maxFiles) {
      dels.push(infos.shift());
    }
    dels.forEach(function delet (ite) {
      fs.unlinkSync(ite.path);
    });
  }, marginTime);
}
module.exports = deleter;

/*
deleter({
  targetDir : './watch',
  margin : 3000,
  maxFiles : 3
});
*/

