graphics.factory('Vector', function() {

  function create(vector, width, height, color) {
    var defaultVector = new THREE.Vector3(0,1,0);

    var bodyGeometry = new THREE.CylinderGeometry(width, width, height, 50, 50, false);
    var bodyMaterial = new THREE.MeshPhongMaterial( { color: color} );
    var body = new THREE.Mesh(bodyGeometry, bodyMaterial);

    var headGeometry = new THREE.CylinderGeometry(0, 2*width, 0.1, 50, 50, false);
    var headMaterial = new THREE.MeshPhongMaterial( { color: color } );
    var head = new THREE.Mesh(headGeometry, headMaterial);

    head.position.y = height/2;
    body.add(head);

    var rotation = computeRotation(defaultVector, vector);
    body.rotateOnAxis(rotation.axis, rotation.angle);

    return body;
  }

  function computeRotation(from, to) {
    var vectorAngle = from.angleTo(to);
    var vectorAxis = new THREE.Vector3();
    vectorAxis.crossVectors(from, to);
    vectorAxis.normalize();

    return {angle: vectorAngle, axis: vectorAxis};
  }

  var Vector = function(spec) {
    spec = spec || {};
    var defaults = {
      vector: [1, 1, 1],
      width: 0.01,
      length: 1,
      color: 0xff0000
    };

    var that = {};
    var vector = new THREE.Vector3();
    vector.fromArray('vector' in spec ? spec.vector : [1, 1, 1]);
    var currentVector = new THREE.Vector3();
    currentVector.copy(vector);
    var color = 'color' in spec ? spec.color : 0xff0000;
    var width = 'width' in spec ? spec.width : 0.01;
    var length = 'length' in spec ? spec.length : 1;
    var object = create(vector, width, length, color);

    var goalVector = new THREE.Vector3(0,0,0);
    var animationSpeed = 0;
    var animationStep = 0;

    that.setAnimationProperties = function(params) {
      params = params || {};
      var defaults = {
        vector: [1, 1, 1],
        speed: 0.01
      };

      goalVector.fromArray('vector' in params ? params.vector : defaults.vector);
      animationSpeed = 'speed' in params ? params.speed : defaults.speed;
    };

    that.animate = function() {
      if (animationSpeed === 0) {
          return;
      }

      animationStep += animationSpeed;
      animationStep = animationStep >= 1 ? 1 : animationStep;
      var lerpVector = new THREE.Vector3();
      lerpVector.lerpVectors(vector, goalVector, animationStep);

      var rotation = computeRotation(currentVector, lerpVector);
      currentVector.copy(lerpVector);
      object.rotateOnAxis(rotation.axis, rotation.angle);
    };

    that.getObject = function() {
      return object;
    };

    return that;
  };

  return Vector;
});
