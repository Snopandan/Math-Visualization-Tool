GraphicsModule.factory('Plane', ['Vec3', 'Vector', function(Vec3, Vector) {
    function create(normal, showNormal, size, gridStep) {
      var gridGeometry = new THREE.Geometry();
      var gridMaterial = new THREE.LineBasicMaterial({color: 0x2aa198});
      var gridSize = 1;

      for(var i = -size; i <= size; i += gridStep) {
        gridGeometry.vertices.push(new THREE.Vector3(-size, 0.0, i));
        gridGeometry.vertices.push(new THREE.Vector3(size, 0.0, i));

        gridGeometry.vertices.push(new THREE.Vector3(i, 0.0, -size));
        gridGeometry.vertices.push(new THREE.Vector3(i, 0.0, size));
      }
      var lines = new THREE.Line(gridGeometry, gridMaterial, THREE.LinePieces);

      var planeGeometry = new THREE.PlaneGeometry(size * 2, size * 2, 32);
      var planeMaterial = new THREE.MeshBasicMaterial({color: 0x2aa198, transparent: true, opacity: 0.3, side: THREE.DoubleSide});
      var plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = Math.PI/2.0;
      plane.position.set(0,0,0);

      lines.add(plane);
      var defaultNormal = Vec3(0, 1, 0);
      var rotation = defaultNormal.angleTo(normal);
      lines.rotateOnAxis(rotation.axis.getObject(), rotation.angle);

      return lines;
    }

    var Plane = function(spec) {
      spec = spec || {};

      var that = {};

      var defaults = {
        normal: Vec3(0, 1, 0),
        showNormal: false,
        size: 2,
        gridStep: 0.2
      };

      var normal = 'normal' in spec ? spec.normal : defaults.normal;
      var showNormal = 'showNormal' in spec ? spec.showNormal : defaults.showNormal;
      var size = 'size' in spec ? spec.size : defaults.size;
      var gridStep = 'gridStep' in spec ? spec.gridStep : defaults.gridStep;
      var object = create(normal, showNormal, size, gridStep);

      that.getObject = function() {
        return object;
      };

      return that;
    };

    return Plane;
}]);
