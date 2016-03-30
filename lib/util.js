var fs = require('fs');

var getProperties = function (propertiesFile) {
  return fs.readFileSync(propertiesFile, 'utf-8').split('\n').filter(function (line) {
    return line.trim().length > 0;
  }).map(function (line) {
    var pos = line.indexOf('=');
    return {
      key: line.slice(0, pos).trim(),
      value: line.slice(pos + 1).trim()
    };
  });
};

var setProperties = exports.setProperties = function (properties, propertiesFile) {
  getProperties(propertiesFile).forEach(function (property) {
    properties.setPropertySync(property.key, property.value);
  });
};