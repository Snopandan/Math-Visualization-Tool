core.factory('DirectionalLight', ['Vec3', function(Vec3) {

  var DirectionalLight = function(spec) {
    spec = spec || {};
    var that = {};

    var defaults = {
      color: 0xffffff,
      intensity: 1.0,
      position: Vec3(0, 0, 0)
    };
    var color = 'color' in spec ? spec.color : defaults.color;
    var intensity = 'intensity' in spec ? spec.intensity : defaults.intensity;
    var position = 'position' in spec ? spec.position : defaults.position;

    var light = new THREE.DirectionalLight(color, intensity);
    light.position.set(position.x(), position.y(), position.z());

    that.getObject = function() {
        return light;
    };

    return that;
  };

  return DirectionalLight;
}]);
