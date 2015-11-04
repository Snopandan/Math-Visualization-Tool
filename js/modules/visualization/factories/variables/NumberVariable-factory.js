VisualizationModule.factory('NumberVariable', ['Variable', function(Variable) {
  var NumberVariable = function(name, value) {
    var that = Variable('Number', name, value);

    return that;
  };

  return NumberVariable;

}]);
