var targets = {
  colorChange : require("./colorChange.js"),
  colorFlopChange : require("./colorFlopChange.js"),
  flopChange : require("./flopChange.js")
};
module.exports = function extendLib (lib) {
  Object.keys(targets).forEach(function __each (key) {
    lib.prototype[key] = targets[key];
  });
  return lib;
}