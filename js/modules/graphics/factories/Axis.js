graphics.factory('Axis', ['Vector', function(Vector) {
  return {
    create: function(size) {
      var axis = new THREE.Mesh();
      var xAxis = new Vector({vector: [1, 0, 0], width: 0.03, length: size, color: 0xff0000});
      var yAxis = new Vector({vector: [0, 1, 0], color: 0x00ff00});
      var zAxis = new Vector({vector: [0, 0, 1], width: 0.03, length: size, color: 0x0000ff});
      axis.add(xAxis.object);
      axis.add(yAxis.object);
      axis.add(zAxis.object);

      xAxis.animate();
      xAxis.update();
      yAxis.animate();
      yAxis.update();
      zAxis.animate();
      zAxis.update();

      return axis;
    }
  };
}]);
