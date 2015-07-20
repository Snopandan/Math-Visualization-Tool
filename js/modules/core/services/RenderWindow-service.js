function RenderWindow(Scene, OrbitControler, Renderer, PerspectiveCamera, DirectionalLight, Vec3, Vector, Axis, Plane, Animation) {
  var scene = Scene();

  var camera = PerspectiveCamera({
    up: Vec3(0, 0, 1),
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

  var v1 = Vec3(1, 0, 0);
  var v2 = Vec3(1, 0, 1);
  var vec = Vector({vector: v1});
  vec.setAnimationProperties({vector: Vec3(1,1,0)});
  // vec.animate();
  scene.add(vec);

  var defVec = Vector({vector: Vec3(0,1,0)});
  console.log(defVec.getObject().rotation.x);
  console.log(defVec.getObject().rotation.y);
  console.log(defVec.getObject().rotation.z);
  scene.add(defVec);
  var vec1 = Vector({vector: v1, color: 0x00ff00});
  var vec2 = Vector({vector: v2, color: 0xffff00});

  var from = {
    x: vec1.getObject().rotation.x,
    y: vec1.getObject().rotation.y,
    z: vec1.getObject().rotation.z
  };
  var to = {
    x: vec2.getObject().rotation.x,
    y: vec2.getObject().rotation.y,
    z: vec2.getObject().rotation.z
  };

  var rotx = Math.atan2(vec2.getObject().position.y, vec2.getObject().position.z);
  var roty = Math.atan2(vec2.getObject().position.x * Math.cos(rotx), vec2.getObject().position.z);
  var rotz = Math.atan2(Math.cos(rotx), Math.sin(rotx) * Math.sin(roty));
  console.log("rotx = " + rotx);
  console.log("roty = " + roty);
  console.log("rotz = " + rotz);

  // var from = {
  //   x: v1.x(),
  //   y: v1.y(),
  //   z: v1.z()
  // };
  // var to = {
  //   x: v2.x(),
  //   y: v2.y(),
  //   z: v2.z()
  // };
  console.log(from);
  console.log(to);

  var hej = function() {

    // var v = Vec3(from.x, from.y, from.z);
    // var vVec = Vector({vector: v});
    // console.log(v.x() + " " + v.y() + " " + v.z());
    var angles =  new THREE.Euler( from.x, from.y, from.z, 'XYZ' );
    var mat = new THREE.Matrix4().makeRotationFromEuler(angles);
    vec1.getObject().rotation.setFromRotationMatrix(mat);
    // vec1.getObject().rotation.x = from.x;
    // vec1.getObject().rotation.y = from.y;
    // vec1.getObject().rotation.z = from.z;
    // vec1.getObject().rotation.x = vVec.getObject().rotation.x;
    // vec1.getObject().rotation.y = vVec.getObject().rotation.y;
    // vec1.getObject().rotation.z = vVec.getObject().rotation.z;
  };
  var animation = Animation(from, to, hej, {time: 5000, repeat: Infinity});
  animation.start();
  // var tween = new TWEEN.Tween(from).to(to, 2000);
  // tween.onUpdate();
  // tween.start();
  scene.add(vec1);
  scene.add(vec2);


  var rotation = v1.angleTo(v2);
  var vec3 = Vector({vector: rotation.axis, color: 0x00ffff});
  scene.add(vec3);

  var plane = Plane({normal: Vec3(0, 0, 1)});
  scene.add(plane);
  var axis = Axis();
  // scene.add(axis);

  var directionalLight1 = DirectionalLight({
    color: 0xffffff,
    intensity: 1.0,
    position: Vec3(1, 1, 1)
  });
  scene.add(directionalLight1);

  var directionalLight2 = DirectionalLight({
    color: 0xffffff,
    intensity: 1.0,
    position: Vec3(-1, 1, -1)
  });
  scene.add(directionalLight2);

  function render() {
    TWEEN.update();
    // vec.animate();
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

  this.renderStart = function() {
    render();
  };

  this.add = function(object) {
    scene.add(object);
  };
}

core.service('RenderWindow', ['Scene', 'OrbitControler', 'Renderer', 'PerspectiveCamera', 'DirectionalLight', 'Vec3', 'Vector', 'Axis', 'Plane', 'Animation', RenderWindow]);
