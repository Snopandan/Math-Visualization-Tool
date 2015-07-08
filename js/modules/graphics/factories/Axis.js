graphics.factory('Axis', ['Vector', function(Vector) {
  return {
    create: function(size) {
      console.log('axis');
      var axis = new THREE.Mesh();
      var xAxis = Vector.create([1, 0, 0], 0.03, size, 0xff0000);
      var yAxis = Vector.create([0, 1, 0], 0.03, size, 0x00ff00);
      var zAxis = Vector.create([0, 0, 1], 0.03, size, 0x0000ff);
      console.log('axis');
      axis.add(xAxis);
      axis.add(yAxis);
      axis.add(zAxis);

      return axis;
    }
  };
}]);
