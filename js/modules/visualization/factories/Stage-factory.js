VisualizationModule.factory('Stage', [function() {
  var Stage = function(spec) {
    spec = spec || {};
    var defaults = {
      description: '',
      inhereting: true
    };

    var that = {};
    var description = 'description' in spec ? spec.description : defaults.description;
    var inhereting = 'inhereting' in spec ? spec.inhereting : defaults.inhereting;

    var objects = [];
    var numberOfObjects = 0;

    that.setDescription = function(desc) {
      description = desc;
    };

    that.add = function(object) {
      objects.push(object);
      numberOfObjects++;
    };

    that.getObjects = function() {
      return objects;
    };

    that.getObject = function(i) {
      return objects[i];
    };

    that.getNumberOfObjects = function() {
      return numberOfObjects;
    };

    that.getDescription = function() {
      return description;
    };

    that.shouldInherit = function() {
      return inhereting;
    };

    return that;
  };

  return Stage;
}]);
