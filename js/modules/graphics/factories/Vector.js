graphics.factory('Vector', function() {
  return {
    create: function(width, height, color) {
      var bodyGeometry = new THREE.CylinderGeometry(width, width, height, 50, 50, false);
      var bodyMaterial = new THREE.MeshPhongMaterial( { color: color} );
      var body = new THREE.Mesh(bodyGeometry, bodyMaterial);

      var headGeometry = new THREE.CylinderGeometry(0, 2*width, 0.1, 50, 50, false);
      var headMaterial = new THREE.MeshPhongMaterial( { color: color } );
      var head = new THREE.Mesh(headGeometry, headMaterial);

      head.position.y = height/2;
      body.add(head);

      return body;
    }
  };
});
