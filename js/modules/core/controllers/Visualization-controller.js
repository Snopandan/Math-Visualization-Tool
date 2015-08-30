function VisualizationCtrl($http, RenderWindow, VisualizationCollection) {
  var that = this;

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

CoreModule.controller('VisualizationCtrl', ['$http', 'RenderWindow', 'VisualizationCollection', VisualizationCtrl]);
