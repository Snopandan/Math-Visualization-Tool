VisualizationModule.factory('ProjectionIntroduction', ['Visualization', 'Vec3', 'Plane', 'Vector', 'DirectionalLight', 'Animation', function(Visualization, Vec3, Plane, Vector, DirectionalLight, Animation) {
  var viz = Visualization();

  viz.setName('Introduktion till ortogonal projektion');

  viz.addStage('Betrakta planet vars normal är parallel med z-axeln (n = [0, 0, 1]).', stage1Setup);
  viz.addStage('Vi ritar nu vektorn v = [1, 1, 1]', stage2Setup);
  viz.addStage('Vecktorn v projiceras nu ortogonalt på planet och bildar vectorn v<sub>projektion</sub>', stage3Setup);

  var normalVec3 = Vec3(0, 0, 1);
  var normal = Vector({vector: normalVec3, color: 0x00ff00});
  normal.translateZ(0.5);
  var plane = Plane({normal: normalVec3});

  function basicSetup() {
    viz.add(DirectionalLight({position: Vec3(1, -1, 1)}));
    viz.add(DirectionalLight({position: Vec3(1, -1, -1)}));

    // viz.add(DirectionalLight({position: Vec3(1, 1, 1)}));
    // viz.add(DirectionalLight({position: Vec3(1, 1, -1)}));

    // viz.add(DirectionalLight({position: Vec3(-1, 1, 1)}));
    // viz.add(DirectionalLight({position: Vec3(-1, 1, -1)}));
  }

  function stage1Setup() {
    viz.clearScene();
    basicSetup();
    viz.add(normal);
    viz.add(plane);
  }

  var originalVector = Vector({vector: Vec3(1, 1, 1), color: 0x00ff00, length: 1.5});
  originalVector.translateZ(0.75);

  var projectedVector = Vector({vector: Vec3(1, 1, 0), color: 0x00ff00, length: 1.5});
  projectedVector.translateZ(0.75);

  function stage2Setup() {
    viz.add(originalVector);
  }

  // var from = {
  //   x: originalVector.getRotationX(),
  //   y: originalVector.getRotationY(),
  //   z: originalVector.getRotationZ()
  // };
  //
  // var to = {
  //   x: vec2.getObject().rotation.x,
  //   y: vec2.getObject().rotation.y,
  //   z: vec2.getObject().rotation.z
  // };
  //
  // var animationFunc = function() {
  //
  // };

  // var animation = Animation(from, to, hej, {time: 5000, repeat: Infinity});
  function stage3Setup() {
    viz.add(projectedVector);
  }

  return viz;
}]);
