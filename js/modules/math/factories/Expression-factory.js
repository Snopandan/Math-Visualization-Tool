MathModule.factory('Expression', ['ExpressionParser', function(ExpressionParser) {
  var Expression = function(spec) {
    spec = spec || {};
    var that = {};

    var defaults = {
      expression: '',
      variables: [],
      parameters: []
    };

    var expression = 'expression' in spec ? spec.expression : defaults.expression;
    var variables = 'variables' in spec ? spec.variables : defaults.variables;
    var parameters = 'parameters' in spec ? spec.parameters : defaults.parameters;

    var parser = ExpressionParser();

    

    return that;
  };

  return Expression;
}]);
