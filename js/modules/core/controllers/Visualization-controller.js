function VisualizationCtrl($http, RenderWindow, VisualizationCollection, ExpressionParser) {
  var that = this;

  var ep = ExpressionParser();
  var fun = ep.parse('x^2 + y^2', ['x', 'y']);
  console.log('x = 0, y = 0: ' + fun(0,0));
  console.log('x = 1, y = 1: ' + fun(1,1));
  console.log('x = 3, y = 3: ' + fun(3,3));

  that.currentStage = 1;
  that.finalStage = 1;
  that.name = "";
  that.visualizationIds = [];
  that.currentVisualizationId = 0;
  that.visualizations = [];
  var currentVisualization;

  that.changeCurrentVisualization = function() {
    currentVisualization = that.visualizations[that.currentVisualizationId];
    currentVisualization.setStage(0);
    RenderWindow.setScene(currentVisualization.getScene());

    that.finalStage = currentVisualization.getNumberOfStages();

    that.name = currentVisualization.getName();
    that.currentDescription = currentVisualization.getCurrentDescription();
    that.currentStage = 1;
  };

  var collection = VisualizationCollection();
  collection.fetch(function(visualizations, numberOfVisualizations) {
    console.log(numberOfVisualizations);
    console.log(visualizations);

    for (var i in visualizations) {
      that.visualizationIds.push({id: i, name: visualizations[i].getName()});
    }

    that.visualizations = visualizations;
    that.changeCurrentVisualization();

  });
  // var visualization = collection.getVisualizations();
  // var currentVisualization = visualization[0];
  // that.currentStage = 1;
  // that.finalStage = getFinalStageNumber();
  // that.name = currentVisualization.getName();
  // that.currentDescription = getCurrentDescription();
  // callCurrentCallback();
  //
  // RenderWindow.setScene(currentVisualization.getScene());

  that.next = function() {
    currentVisualization.nextStage();
    that.currentDescription = currentVisualization.getCurrentDescription();
    that.currentStage++;
  };

  that.previous = function() {
    currentVisualization.previousStage();
    that.currentDescription = currentVisualization.getCurrentDescription();
    that.currentStage--;
  };

  function getCurrentDescription() {
    return currentVisualization.getDescription(that.currentStage);
  }

  function callCurrentCallback() {
    currentVisualization.getCallback(that.currentStage)();
  }

  function getFinalStageNumber() {
    return currentVisualization.getNumberOfStages();
  }
}

CoreModule.controller('VisualizationCtrl', ['$http', 'RenderWindow', 'VisualizationCollection', 'ExpressionParser', VisualizationCtrl]);
