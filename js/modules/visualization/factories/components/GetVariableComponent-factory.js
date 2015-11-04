VisualizationModule.factory('GetVariableComponent', ['Component', function(Component) {
  var GetVariableComponent = function(variable) {
    var that = Component();

    var set = function() {
      that.setOutput(variable);
    };

    that.setFun(set);

    return that;
  };

  return GetVariableComponent;

}]);
