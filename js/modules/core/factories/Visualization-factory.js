core.factory('Visualization', ['Scene', function(Scene) {

  var Visualization = function() {
    var that = {};

    var scene = Scene();
    var stageDescriptions = [];
    var stageCallbacks = [];
    var numberOfStages = 0;

    that.addStage = function(description, callback) {
      stageDescriptions.push(description);
      stageCallbacks.push(callback);
      numberOfStages++;
    };

    that.getNumberOfStages = function() {
      return numberOfStages;
    };

    that.getDescription = function(index) {
      return stageDescriptions[index - 1];
    };

    that.getCallback = function(index) {
      return stageCallbacks[index - 1];
    };

    that.add = function(object) {
      scene.add(object);
    };

    that.getScene = function() {
      return scene;
    };

    return that;
  };

  return Visualization;
}]);
