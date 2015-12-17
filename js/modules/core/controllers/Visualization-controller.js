function VisualizationCtrl($routeParams, $http, RenderWindow, VisualizationCollection, AssignmentComponent, NumberVariable, GetVariableComponent) {
  var that = this;
  that.currentStage = 1;
  that.finalStage = 1;
  that.name = "";
  that.visualizationIds = [];
  that.currentVisualizationId = 0;
  that.visualizations = [];
  var currentVisualization;
  ////////////////////////////////
  var num10 = NumberVariable('hej', 10);
  var num5 = NumberVariable('hej', 5);

  var get = GetVariableComponent(num5);
  var comp = AssignmentComponent(num10, get);

  console.log('num10 = ' + num10.getValue());
  console.log('num5 = ' + num5.getValue());
  comp.resolve();
  console.log('num10 = ' + num10.getValue());
  console.log('num5 = ' + num5.getValue());



  // var dep1 = AssignmentComponent();
  //
  // dep1.setFun(function(){
  //   console.log('hej this is dep1');
  // });
  //
  // var dep2 = AssignmentComponent();
  //
  // dep2.setFun(function(){
  //   console.log('hej this is dep2');
  // });

  // comp.addDependency(dep1);
  // comp.addDependency(dep2);
  //
  // comp.resolve();

  ///////////////////////////////
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

  that.nextViz = function() {
    that.currentVisualizationId++;
    that.changeCurrentVisualization();
  };

  that.previousViz = function() {
    that.currentVisualizationId--;
    that.changeCurrentVisualization();
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

CoreModule.controller('VisualizationCtrl', ['$routeParams', '$http', 'RenderWindow', 'VisualizationCollection', 'AssignmentComponent', 'NumberVariable', 'GetVariableComponent', VisualizationCtrl]);
