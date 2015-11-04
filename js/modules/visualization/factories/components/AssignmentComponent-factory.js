VisualizationModule.factory('AssignmentComponent', ['Component', function(Component) {
  var AssignmentComponent = function(variable, value) {
    var that = Component();

    // Left hand side needs to be resolved first.
    that.addDependency(value);

    var assign = function() {
      variable.setValue(value.getOuput().getValue());
    };
    that.setFun(assign);

    return that;
  };

  return AssignmentComponent;

}]);
