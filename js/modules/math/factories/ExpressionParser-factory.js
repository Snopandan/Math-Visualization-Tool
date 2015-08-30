MathModule.factory('ExpressionParser', [function() {
  var ExpressionParser = function() {
    var that = {};

    that.parse = function(expression, variables) {
      return Parser.parse(expression).toJSFunction(variables);
    };

    return that;
  };

  return ExpressionParser;
}]);
