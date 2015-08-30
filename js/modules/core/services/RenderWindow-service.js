function RenderWindow(Scene, OrbitControler, Renderer, PerspectiveCamera, DirectionalLight, Vec3, Vector, Axis, Plane, Animation) {
  var defaultScene = Scene();
  var scene = defaultScene;

  var camera = PerspectiveCamera({
    up: Vec3(0, 1, 0),
    lookAt: Vec3(0, 0, 0),
    position: Vec3(2, 4, 5)
  });

  var renderer = Renderer({
    antialias: true,
    color: 0xfdf6e3,
    alpha: 1
  });

  var controls = OrbitControler({
    camera: camera,
    domElement: renderer.getDomElement()
  });

  function render() {
    TWEEN.update();
    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  this.init = function(width, height) {
    renderer.setSize(width, height);
    camera.setAspectRatio(width / height);
  };

  this.getDomElement = function() {
    return renderer.getDomElement();
  };

  this.setSize = function(width, height) {
    renderer.setSize(width, height);
    camera.setAspectRatio(width / height);

  };

  this.setScene = function(s) {
    scene = s;
  };

  this.renderStart = function() {
    render();
  };
}

CoreModule.service('RenderWindow', ['Scene', 'OrbitControler', 'Renderer', 'PerspectiveCamera', 'DirectionalLight', 'Vec3', 'Vector', 'Axis', 'Plane', 'Animation', RenderWindow]);
