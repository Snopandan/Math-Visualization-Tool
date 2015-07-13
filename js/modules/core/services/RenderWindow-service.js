function RenderWindow(Vector, Axis, Plane) {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, 1 / 1, 0.1, 1000 );
  camera.position.set(2,4,5);
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor( 0xfdf6e3, 1 );
  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  scene.add(Plane.create());
  scene.add(Axis.create(5));

  var directionalLight1 = new THREE.DirectionalLight( 0xffffff, 1.0 );
  directionalLight1.position.set( 1, 1, 1 );
  scene.add( directionalLight1 );

  var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 1.0 );
  directionalLight2.position.set( -1, 1, -1 );
  scene.add( directionalLight2 );

  function render() {
    controls.update();
    requestAnimationFrame( render );
    renderer.render( scene, camera );
  }

  this.init = function(width, height) {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  this.getDomElement = function() {
    return renderer.domElement;
  };

  this.setSize = function(width, height) {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  this.renderStart = function() {
    render();
  };

  this.add = function(object) {
    scene.add(object);
  };
}

core.service('RenderWindow', ['Vector', 'Axis', 'Plane', RenderWindow]);
