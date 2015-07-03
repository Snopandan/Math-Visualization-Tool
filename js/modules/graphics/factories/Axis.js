graphics.factory('Axis', ['Vector', function(Vector) {
  return {
    create: function(size) {
      var axis = new THREE.Mesh();
      var xAxis = Vector.create(0.03, size, 0xff0000);
      xAxis.rotation.z = -Math.PI/2.0;
      var yAxis = Vector.create(0.03, size, 0x00ff00);
      yAxis.rotation.x = -Math.PI/2.0;
      var zAxis = Vector.create(0.03, size, 0x0000ff);

      axis.add(xAxis);
      axis.add(yAxis);
      axis.add(zAxis);

      return axis;
    }
  };
}]);
