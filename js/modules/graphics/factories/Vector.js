graphics.factory('Vector', function() {

  function create(vector, width, height, color) {
    var defaultVector = new THREE.Vector3(0,1,0);

    var vectorAngle = defaultVector.angleTo(vector);
    var vectorAxis = new THREE.Vector3();
    vectorAxis.crossVectors(defaultVector, vector);
    vectorAxis.normalize();

    var bodyGeometry = new THREE.CylinderGeometry(width, width, height, 50, 50, false);
    var bodyMaterial = new THREE.MeshPhongMaterial( { color: color} );
    var body = new THREE.Mesh(bodyGeometry, bodyMaterial);

    var headGeometry = new THREE.CylinderGeometry(0, 2*width, 0.1, 50, 50, false);
    var headMaterial = new THREE.MeshPhongMaterial( { color: color } );
    var head = new THREE.Mesh(headGeometry, headMaterial);

    head.position.y = height/2;
    body.add(head);

    body.rotateOnAxis(vectorAxis, vectorAngle);

    return body;
  }

  var Vector = function(spec) {
    this.vector = new THREE.Vector3();
    this.vector.fromArray(spec.vector || [1, 1, 1]);
    this.color = spec.color || 0xff0000;
    this.width = spec.width || 0.01;
    this.length = spec.length || 1;
    this.object = create(this.vector, this.width, this.length, this.color);

    this.goalVector = new THREE.Vector3(0,0,0);
    this.animationSpeed = 0;
  };

  return Vector;
});
