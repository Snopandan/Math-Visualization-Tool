GraphicsModule.factory('Graph3D', ['Vec3', 'Expression', function(Vec3, Expression) {
  var Graph3D = function(spec) {
    var that = {};
    spec = spec || {};

    var defaults = {
      expression: 'x^2 + y^2',
      xMin: 10,
      xMax: 10,
      yMin: 10,
      yMax: 10
    };

    var expression = 'expression' in spec ? spec.expression : spec.expression;
    var xMin = 'xMin' in spec ? spec.xMin : defaults.xMin;
    var xMax = 'xMin' in spec ? spec.xMax : defaults.xMax;
    var yMin = 'yMin' in spec ? spec.yMin : defaults.yMin;
    var yMax = 'yMin' in spec ? spec.yMax : defaults.yMax;

    var expressionObject = Expression(expression);

    function create() {
      var fxy = expressionObject.getJsFunction(['x', 'y']);
      xRange = xMax - xMin;
      yRange = yMax - yMin;

      function computeMesh(x, y) {
        var xVal = xRange * x + xMin;
        var yVal = yRange * y + yMin;
        var zVal = fxy(xVal, yVal) || 0;

        return Vec3(xVal, yVal, zVal);
      }
    }

    return that;
  };

  return Graph3D;
}]);
