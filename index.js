var fs = require('fs'),
    im = require('imagemagick'),
    deleter = require('./lib/deleter.js'),
    extendLib = require('./lib/convert_definitions/index.js'),
    MultipleQueue = require('queue-service').Multiple,
    imc = ImageMagickCache;

function ImageMagickCache (config) {
  this.config = config;
  var self = this;
  this.working = Object.create(null);
  deleter(config.deleter);
  this.queue = new MultipleQueue(__worker, config.queue);
  function __worker (data, callback) {
    if (self.config.latency) {
      setTimeout(function __latency () {
        im.convert(data.args, __callback);
      }, self.config.latency);
    } else {
      im.convert(data.args, __callback);
    }
    function __callback (err) {
      callback(err, data);
    }
  }
};
imc.prototype.check = function check (personalID, callback) {
  var count = this.queue.queue.waiting.filter(
    function __filtering (target) {
      return target.data.personalID === personalID;
    }).length;
  if (count < this.config.personLimit) {
    callback(null);
  } else {
    callback(makeError());
  }
  function makeError () {
    var err = new Error;
    err.name = 'SamePersonError';
    err.message = 'too many same person.';
    return err;
  }
};
imc.prototype.convert = function convert (data, completed) {
  var self = this,
      queue = self.queue,
      file = data.file,
      personalID = data.personalID || '';
  fs.stat(file, setTruthJob(file));
  function setTruthJob (job) {
    return function __onStat (notExists, stats) {
      notExists ? 
        self.check(data.personalID, onChecked) : 
        completed(null, data);
    }
    function onChecked (err) {
      if (err) {
        completed(err, data);
      } else {
        queue.register(job, data, completed)
      }
    }
  }
};

module.exports = extendLib(imc);
