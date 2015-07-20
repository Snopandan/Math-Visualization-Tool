core.factory('Renderer', function() {

  var Renderer = function(spec) {
    spec = spec || {};
    var that = {};

    var defaults = {
      color: 0xfdf6e3,
      alpha: 1,
    };

    var params = {
      antialias: 'antialias' in spec ? spec.antialias : true
    };
    var renderer = new THREE.WebGLRenderer(params);

    var color = 'color' in spec ? spec.color : defaults.color;
    var alpha = 'alpha' in spec ? spec.alpha : defaults.alpha;
    renderer.setClearColor(color, alpha);

    that.render = function(scene, camera) {
      renderer.render(scene.getObject(), camera.getObject());
    };

    that.setSize = function(width, height) {
      renderer.setSize(width, height);
    };

    that.getDomElement = function() {
      return renderer.domElement;
    };

    return that;
  };

  return Renderer;
});
