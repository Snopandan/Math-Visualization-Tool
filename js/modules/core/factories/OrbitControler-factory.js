core.factory('OrbitControler', ['PerspectiveCamera', function(PerspectiveCamera) {

  var OrbitControler = function(spec) {
    spec = spec || {};
    var that = {};

    defaults = {
      camera: PerspectiveCamera(),
      domElement: document.body
    };

    var camera = 'camera' in spec ? spec.camera : defaults.camera;
    var domElement = 'domElement' in spec ? spec.domElement : defaults.domElement;

    var controls = new THREE.OrbitControls(camera.getObject(), domElement);

    that.update = function() {
      controls.update();
    };

    that.getObject = function() {
      return controls;
    };

    return that;
  };

  return OrbitControler;
}]);
