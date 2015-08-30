GraphicsModule.factory('ParametricGeometry', ['Vec3', function(Vec3) {
  var ParametricGeometry = function(spec) {
    var that;
    spec = spec || {};

    var defaultFunction = function(x,y) {
      return Vec3(0, 0, 0);
    };

    var defaults = {
      func: defaultFunction,
      slices: 10,
      stacks: 10
    };

    var func = 'func' in spec ? spec.func : defaults.func;
    var slices = 'slices' in spec ? spec.slices : defaults.slices;
    var stacks = 'stacks' in spec ? spec.stacks : defaults.stacks;

    return that;
  };

  return ParametricGeometry;
}]);
