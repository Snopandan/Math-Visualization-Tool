core.factory('PerspectiveCamera', ['Vec3', function(Vec3) {

  var PerspectiveCamera = function(spec) {
    spec = spec || {};
    var that = {};

    var defaults = {
      fieldOfView: 75,
      aspectRatio: 1,
      nearPlane: 0.1,
      farPlane: 1000,
      up : Vec3(0, 1, 0),
      lookAt: Vec3(0, 0, 0),
      position: Vec3(1, 0, 0)
    };

    var fieldOfView = 'fieldOfView' in spec ? spec.fieldOfView : defaults.fieldOfView;
    var aspectRatio = 'aspectRatio' in spec ? spec.aspectRatio : defaults.aspectRatio;
    var nearPlane = 'nearPlane' in spec ? spec.nearPlane : defaults.nearPlane;
    var farPlane = 'farPlane' in spec ? spec.farPlane : defaults.farPlane;
    var up = 'up' in spec ? spec.up : defaults.up;
    var lookAt = 'lookAt' in spec ? spec.lookAt : defaults.lookAt;
    var position = 'position' in spec ? spec.position : defaults.position;

    var camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    camera.position.set(position.x(), position.y(), position.z());
    camera.up = up.getObject();
    camera.lookAt(lookAt.getObject());

    that.setUp = function(newUp) {
      up = newUp;
    };

    that.setAspectRatio = function(ratio) {
      camera.aspect = ratio;
      camera.updateProjectionMatrix();
    };

    that.getObject = function() {
      return camera;
    };

    return that;
  };

  return PerspectiveCamera;
}]);
