VisualizationModule.factory('Visualization', ['Scene', function(Scene) {

  var Visualization = function() {
    var that = {};

    var name = '';
    var scene = Scene();
    var stages = [];
    var numberOfStages = 0;
    var currentStage = 0;

    function addAllFromStage(stage) {
      var numberOfObjects = stage.getNumberOfObjects();
      for (var i = 0; i < numberOfObjects; i++) {
        scene.add(stage.getObject(i));
      }
    }

    that.init = function() {
      addAllFromStage(stages[0]);
    };

    that.nextStage = function() {
      currentStage++;
      if (!stages[currentStage].shouldInherit()) {
        scene.clear();
      }
      addAllFromStage(stages[currentStage]);
    };

    that.previousStage = function() {
      currentStage--;
      that.setStage(currentStage);
    };

    that.setStage = function(stageNumber) {
      that.clearScene();
      currentStage = 0;

      that.init();
      for (var i = 0; i < stageNumber; i++) {
        that.nextStage();
      }
    };

    that.addStage = function(stage) {
      stages.push(stage);
      numberOfStages++;
    };

    that.getNumberOfStages = function() {
      return numberOfStages;
    };

    that.getCurrentDescription = function() {
      return stages[currentStage].getDescription();
    };

    that.setName = function(n) {
      name = n;
    };

    that.getName = function() {
      return name;
    };

    that.getScene = function() {
      return scene;
    };

    that.clearScene = function() {
      scene.clear();
    };

    return that;
  };

  return Visualization;
}]);
