MathModule.factory('Expression', [function() {
  var Expression = function(expression) {
    var that = {};

    var expressionObject = Parser.parse(expression);

    that.eval = function(variables) {
      return expressionObject.evaluate(variables);
    };

    that.getJsFunction = function(variables) {
      return expressionObject.toJSFunction(variables);
    };

    return that;
  };

  return Expression;
}]);
