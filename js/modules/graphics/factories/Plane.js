graphics.factory('Plane', ['Vec3', 'Vector', function(Vec3, Vector) {
    function create(normal, showNormal) {
      var gridGeometry = new THREE.Geometry();
      var gridMaterial = new THREE.LineBasicMaterial({color: 0x2aa198});
      var gridSize = 10;
      var gridStep = 1;

      for(var i = -gridSize; i <= gridSize; i += gridStep) {
        gridGeometry.vertices.push(new THREE.Vector3(-gridSize, 0.0, i));
        gridGeometry.vertices.push(new THREE.Vector3(gridSize, 0.0, i));

        gridGeometry.vertices.push(new THREE.Vector3(i, 0.0, -gridSize));
        gridGeometry.vertices.push(new THREE.Vector3(i, 0.0, gridSize));
      }
      var lines = new THREE.Line(gridGeometry, gridMaterial, THREE.LinePieces);

      var planeGeometry = new THREE.PlaneGeometry( 20, 20, 32 );
      var planeMaterial = new THREE.MeshBasicMaterial( {color: 0x2aa198, transparent: true, opacity: 0.3, side: THREE.DoubleSide} );
      var plane = new THREE.Mesh( planeGeometry, planeMaterial );
      plane.rotation.x = Math.PI/2.0;
      plane.position.set(0,0,0);

      lines.add(plane);

      var defaultNormal = Vec3(0, 1, 0);
      var rotation = defaultNormal.angleTo(normal);
      lines.rotateOnAxis(rotation.axis.getObject(), rotation.angle);

      var normalObject = Vector({normal: normal});
      // lines.add(normalObject.getObject());
      return lines;
    }

    var Plane = function(spec) {
      spec = spec || {};

      var that = {};

      var defaults = {
        normal: Vec3(0, 1, 0),
        showNormal: false
      };

      var normal = 'normal' in spec ? spec.normal : defaults.normal;
      var showNormal = 'showNormal' in spec? spec.showNormal: defaults.showNormal;
      var object = create(normal, showNormal);

      that.getObject = function() {
        return object;
      };

      return that;
    };

    return Plane;
}]);
