function VisualizationCtrl(Visualization) {
  var that = this;
  var viz = Visualization();
  viz.addStage('hej från stage1 description', function() {
    console.log('hej från stage1 callback');
  });

  viz.addStage('hej från stage2 description', function() {
    console.log('hej från stage2 callback');
  });

  var currentVisualization = viz;
  that.currentStage = 1;
  that.finalStage = getFinalStageNumber();
  that.currentDescription = getCurrentDescription();
  callCurrentCallback();

  that.next = function() {
    that.currentStage++;
    that.currentDescription = getCurrentDescription();
    callCurrentCallback();
  };

  that.previous = function() {
    that.currentStage--;
    that.currentDescription = getCurrentDescription();
    callCurrentCallback();
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

core.controller('VisualizationCtrl', ['Visualization', VisualizationCtrl]);
