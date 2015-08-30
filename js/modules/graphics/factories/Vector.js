GraphicsModule.factory('Vector', [ 'Vec3', 'Animation', function(Vec3, Animation) {

  function create(vector, width, height, color, position) {
    var defaultVector = Vec3(0,1,0);

    var bodyGeometry = new THREE.CylinderGeometry(width, width, height, 50, 50, false);
    var bodyMaterial = new THREE.MeshPhongMaterial( { color: color} );
    var body = new THREE.Mesh(bodyGeometry, bodyMaterial);

    var headGeometry = new THREE.CylinderGeometry(0, 2*width, 0.1, 50, 50, false);
    var headMaterial = new THREE.MeshPhongMaterial( { color: color } );
    var head = new THREE.Mesh(headGeometry, headMaterial);

    head.position.y = height/2;
    body.add(head);

    body.position.set(position.x(), position.y(), position.z());
    var rotation = defaultVector.angleTo(vector);
    body.rotateOnAxis(rotation.axis.getObject(), rotation.angle);

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
      vector: Vec3(0, 1, 0),
      position: Vec3(0, 0, 0),
      width: 0.01,
      length: 1,
      color: 0xff0000
    };

    var that = {};
    var vector = 'vector' in spec ? spec.vector : defaults.vector;
    var currentVector = Vec3(vector.x(), vector.y(), vector.z());
    var position = 'position' in spec ? spec.position : defaults.position;
    var color = 'color' in spec ? spec.color : 0xff0000;
    var width = 'width' in spec ? spec.width : 0.01;
    var length = 'length' in spec ? spec.length : 1;
    var object = create(vector, width, length, color, position);

    if ('animation' in spec) {
      var animationDefaults =  {
        vector: [1, 1, 1],
        time: 1000,
        delay: 0,
        repeat: 0,
        stage: 0
      };

      var animationVector = 'vector' in spec.animation ? spec.animation.vector : animationDefaults.vector;
      var time = 'time' in spec.animation ? spec.animation.time : animationDefaults.time;
      var delay = 'delay' in spec.animation ? spec.animation.delay : animationDefaults.delay;
      var repeat = 'repeat' in spec.animation ? spec.animation.repeat : animationDefaults.repeat;

      var targetVector = Vec3(animationVector[0], animationVector[1], animationVector[2]);
      var targetObject = create(targetVector, width, length, color, position);

      var from = {
        x: object.rotation.x,
        y: object.rotation.y,
        z: object.rotation.z
      };

      var to = {
        x: targetObject.rotation.x,
        y: targetObject.rotation.y,
        z: targetObject.rotation.z
      };

      var animationFunction = function() {
        object.rotation.x = from.x;
        object.rotation.y = from.y;
        object.rotation.z = from.z;
      };

      var animation = Animation(from, to, animationFunction, {time: time, repeat: repeat, delay: delay});
      animation.start();
    }






    var goalVector = Vec3(0,0,0);
    var animationSpeed = 0;
    var animationStep = 0;

    that.setAnimationProperties = function(params) {
      params = params || {};
      var defaults = {
        vector: Vec3(1, 1, 1),
        speed: 0.01
      };
      goalVector.copy('vector' in params ? params.vector : defaults.vector);
      animationSpeed = 'speed' in params ? params.speed : defaults.speed;
    };

    that.animate = function() {
      if (animationSpeed === 0) {
          return;
      }

      animationStep += animationSpeed;
      animationStep = animationStep >= 1 ? 1 : animationStep;
      animationStep = 1;
      // console.log(animationStep);
      var lerpVector = Vec3(0, 0, 0);
      lerpVector.lerpVectors(vector, goalVector, animationStep);
      // var rotation = currentVector.angleTo(lerpVector);
      var rotation = computeRotation(currentVector.getObject(), lerpVector.getObject());
      // console.log("currentVector = "+ currentVector.x() + " " + currentVector.y() + " " + currentVector.z());
      currentVector.copy(lerpVector);
      console.log("lerpVector = "+ lerpVector.x + " " + lerpVector.y + " " + lerpVector.z);
      console.log("rotation axis = "+ rotation.axis.x + " " + rotation.axis.y + " " + rotation.axis.z);
      console.log("rotation.angle = " + rotation.angle);

      // var axis = new THREE.Vector3();
      // axis.crossVectors(currentVector.getObject(), lerpVector.getObject());
      // axis.normalize();
      // var v1 = new THREE.Vector3();
      // v1.copy(currentVector.getObject());
      // v1.normalize();
      // var v2 = new THREE.Vector3();
      // v2.copy(lerpVector.getObject());
      // v2.normalize();
      // var prod = v1.dot(v2);
      // var angle = Math.acos(prod);
      // console.log('prod = ' + prod);
      // console.log('angle = ' + angle);

      // var v1 = Vec3(1, 1, 1);
      // var v2 = Vec3(1, 0, 1);
      // var angle = v1.angleTo(v2).angle;
      // console.log("angle = " + angle);
      object.rotateOnAxis(rotation.axis, rotation.angle);
    };

    that.getObject = function() {
      return object;
    };

    that.setRotationX = function(rotation) {
      object.rotation.x = rotation;
    };

    that.setRotationY = function(rotation) {
      object.rotation.y = rotation;
    };

    that.setRotationZ = function(rotation) {
      object.rotation.z = rotation;
    };

    that.getRotationX = function() {
      return object.rotation.x;
    };

    that.getRotationY = function() {
      return object.rotation.y;
    };

    that.getRotationZ = function() {
      return object.rotation.z;
    };

    that.setRotation = function(x, y, z) {
      that.setRotationX(x);
      that.setRotationY(y);
      that.setRotationZ(z);
    };

    that.rotateOnAxis = function(axis, angle) {
      object.rotateOnAxis(axis, angle);
    };

    that.setPosition = function(x, y, z) {
      object.position.set(x, y, z);
    };

    that.translateX = function(distance) {
      object.translateX(distance);
    };

    that.translateY = function(distance) {
      object.translateZ(distance);
    };

    that.translateZ = function(distance) {
      object.translateY(distance);
    };

    if ('translateX' in spec) {
      that.translateX(spec.translateX);
    }

    if ('translateY' in spec) {
      that.translateY(spec.translateY);
    }

    if ('translateZ' in spec) {
      that.translateZ(spec.translateZ);
    }

    return that;
  };

  return Vector;
}]);
