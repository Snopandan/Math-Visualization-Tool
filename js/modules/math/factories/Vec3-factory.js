math.factory('Vec3', function() {
  function Vec3(x, y, z) {
    var that = {};

    var vector = new THREE.Vector3(x, y, z);

    that.x = function() {
      return vector.x;
    };

    that.y = function() {
      return vector.y;
    };

    that.z = function() {
      return vector.z;
    };

    that.angleTo = function(to) {
      var vectorAngle = vector.angleTo(to.getObject());
      var vectorAxis = new THREE.Vector3();
      vectorAxis.crossVectors(vector, to.getObject());
      vectorAxis.normalize();

      return {angle: vectorAngle, axis: Vec3(vectorAxis.x, vectorAxis.y, vectorAxis.z)};
    };

    that.copy = function(v) {
      vector.copy(v.getObject());
    };

    that.lerpVectors = function(start, goal, step) {
      vector.lerpVectors(start.getObject(), goal.getObject(), step);
    };

    that.getObject = function() {
      return vector;
    };

    return that;
  }

  return Vec3;
});
